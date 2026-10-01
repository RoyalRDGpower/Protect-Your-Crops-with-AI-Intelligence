import { verifyJWT } from '../utils/jwt';

export const onRequestPost: PagesFunction<{ DB: D1Database, JWT_SECRET: string }> = async (context) => {
  try {
    const { request, env } = context;

    // Auth Check
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    const secret = env.JWT_SECRET || 'fallback-secret-for-local-dev';
    const payload = await verifyJWT(token, secret);

    if (!payload || !payload.sub) {
      return new Response(JSON.stringify({ error: "Invalid token" }), { status: 401 });
    }

    const userId = payload.sub;
    const body = await request.json() as { scans: any[] };

    if (!body.scans || !Array.isArray(body.scans)) {
      return new Response(JSON.stringify({ error: "Invalid payload" }), { status: 400 });
    }

    const synced = [];

    // Prepare statement for insertion
    const stmt = env.DB.prepare(
      'INSERT INTO scans (id, user_id, disease_name, confidence, treatment, scanned_at) VALUES (?, ?, ?, ?, ?, ?)'
    );

    const batch = [];

    for (const scan of body.scans) {
      const cloudId = crypto.randomUUID();
      batch.push(
        stmt.bind(
          cloudId,
          userId,
          scan.diseaseName,
          scan.confidence,
          scan.treatment,
          new Date(scan.scannedAt).toISOString()
        )
      );

      synced.push({
        localId: scan.id,
        cloudId: cloudId
      });
    }

    if (batch.length > 0) {
      // Execute in a transaction-like batch
      await env.DB.batch(batch);
    }

    return new Response(JSON.stringify({ synced }), {
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};
