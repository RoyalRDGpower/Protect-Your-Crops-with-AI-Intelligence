// For simple JWT encoding/decoding without external dependencies on Cloudflare Workers
// We will use standard Web Crypto API.

const encoder = new TextEncoder();

function base64UrlEncode(data: Uint8Array): string {
    return btoa(String.fromCharCode(...data))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}

export async function signJWT(payload: any, secret: string): Promise<string> {
    const header = { alg: 'HS256', typ: 'JWT' };
    const encodedHeader = base64UrlEncode(encoder.encode(JSON.stringify(header)));
    const encodedPayload = base64UrlEncode(encoder.encode(JSON.stringify(payload)));

    const key = await crypto.subtle.importKey(
        'raw',
        encoder.encode(secret),
        { name: 'HMAC', hash: 'SHA-256' },
        false,
        ['sign']
    );

    const signatureBytes = await crypto.subtle.sign(
        'HMAC',
        key,
        encoder.encode(`${encodedHeader}.${encodedPayload}`)
    );

    const encodedSignature = base64UrlEncode(new Uint8Array(signatureBytes));
    return `${encodedHeader}.${encodedPayload}.${encodedSignature}`;
}

export async function verifyJWT(token: string, secret: string): Promise<any | null> {
    try {
        const parts = token.split('.');
        if (parts.length !== 3) return null;

        const [header, payload, signature] = parts;

        const key = await crypto.subtle.importKey(
            'raw',
            encoder.encode(secret),
            { name: 'HMAC', hash: 'SHA-256' },
            false,
            ['verify']
        );

        // WebCrypto needs the raw bytes of the signature to verify it against the signed data
        // Convert base64url back to base64
        let base64 = signature.replace(/-/g, '+').replace(/_/g, '/');
        // Pad with equals if necessary
        while (base64.length % 4) {
            base64 += '=';
        }

        const sigString = atob(base64);
        const sigBytes = new Uint8Array(sigString.length);
        for (let i = 0; i < sigString.length; i++) {
            sigBytes[i] = sigString.charCodeAt(i);
        }

        const isValid = await crypto.subtle.verify(
            'HMAC',
            key,
            sigBytes,
            encoder.encode(`${header}.${payload}`)
        );

        if (!isValid) return null;

        // Decode payload
        let payloadBase64 = payload.replace(/-/g, '+').replace(/_/g, '/');
        while (payloadBase64.length % 4) {
            payloadBase64 += '=';
        }

        return JSON.parse(atob(payloadBase64));
    } catch (e) {
        return null;
    }
}
