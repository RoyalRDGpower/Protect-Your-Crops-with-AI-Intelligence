import { signJWT } from '../utils/jwt';

async function hashPassword(password: string) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + "SALT_AGRISCAN");
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

export const onRequestPost: PagesFunction<{ DB: D1Database, JWT_SECRET: string }> = async (context) => {
  try {
    const { request, env } = context;
    const body = await request.json() as { email?: string, password?: string };

    if (!body.email || !body.password) {
      return new Response(JSON.stringify({ error: "Missing email or password" }), { status: 400 });
    }

    const email = body.email.toLowerCase();
    const passwordHash = await hashPassword(body.password);

    // Check user and password
    const { results } = await env.DB.prepare(
      'SELECT id, email FROM users WHERE email = ? AND password_hash = ?'
    ).bind(email, passwordHash).all();

    if (results.length === 0) {
      return new Response(JSON.stringify({ error: "Invalid email or password" }), { status: 401 });
    }

    const user = results[0];

    // Generate JWT
    const secret = env.JWT_SECRET || 'fallback-secret-for-local-dev';
    const token = await signJWT({ sub: user.id, email: user.email }, secret);

    return new Response(JSON.stringify({ token, user: { id: user.id, email: user.email } }), {
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};
