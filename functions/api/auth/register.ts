import { signJWT } from '../utils/jwt';

// Helper for generic SHA-256 hash (simple approach for MVP without scrypt)
async function hashPassword(password: string) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + "SALT_AGRISCAN"); // Simple salt
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

    // Check if user exists
    const { results } = await env.DB.prepare('SELECT id FROM users WHERE email = ?').bind(email).all();

    if (results.length > 0) {
      return new Response(JSON.stringify({ error: "Email already registered" }), { status: 400 });
    }

    const userId = crypto.randomUUID();
    const passwordHash = await hashPassword(body.password);

    // Insert user
    await env.DB.prepare(
      'INSERT INTO users (id, email, password_hash) VALUES (?, ?, ?)'
    ).bind(userId, email, passwordHash).run();

    // Generate JWT
    const secret = env.JWT_SECRET || 'fallback-secret-for-local-dev';
    const token = await signJWT({ sub: userId, email }, secret);

    return new Response(JSON.stringify({ token, user: { id: userId, email } }), {
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};
