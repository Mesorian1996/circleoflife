const ALLOWED_ORIGIN = 'https://circleoflife-bjj.de';

function cors(origin) {
  const allowed = origin === ALLOWED_ORIGIN ? origin : ALLOWED_ORIGIN;
  return {
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') ?? '';

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: cors(origin) });
    }

    if (request.method !== 'POST') {
      return new Response('Method Not Allowed', { status: 405 });
    }

    let data;
    try {
      data = await request.json();
    } catch {
      return Response.json(
        { success: false, message: 'Ungültige Anfrage.' },
        { status: 400, headers: cors(origin) }
      );
    }
    if (data.botcheck) {
      return Response.json({ success: false }, { status: 400, headers: cors(origin) });
    }

    const anrede   = data.anrede   ?? '';
    const vorname  = data.vorname  ?? '';
    const nachname = data.nachname ?? '';
    const email    = data.email    ?? '';
    const phone    = data.phone    ?? '';
    const kurs     = data.kurs     ?? '';
    const message  = data.message  ?? '';

    if (!vorname || !email) {
      return Response.json(
        { success: false, message: 'Pflichtfelder fehlen.' },
        { status: 400, headers: cors(origin) }
      );
    }

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `Circle of Life BJJ <${env.RESEND_FROM}>`,
        to: [env.RESEND_TO],
        reply_to: email,
        subject: `Neue Anfrage zum Probetraining von ${anrede} ${vorname} ${nachname}`,
        html: `
          <div style="font-family:sans-serif;color:#111;max-width:560px;">
            <p>Hallo Marvin,</p>
            <p>eine neue Anfrage zum Probetraining ist eingetroffen 🙂</p>
            <hr style="border:none;border-top:1px solid #e5e7eb;margin:20px 0;"/>
            <p><strong>Anrede:</strong> ${anrede || '–'}</p>
            <p><strong>Vorname:</strong> ${vorname}</p>
            <p><strong>Nachname:</strong> ${nachname}</p>
            <p><strong>Telefon:</strong> ${phone || '–'}</p>
            <p><strong>E-Mail:</strong> ${email}</p>
            <p><strong>Kurs:</strong> ${kurs || '–'}</p>
            <p><strong>Nachricht:</strong><br/>${message || '–'}</p>
            <hr style="border:none;border-top:1px solid #e5e7eb;margin:20px 0;"/>
            <p style="color:#6b7280;font-size:13px;">
              Antworte einfach auf diese E-Mail, um der Person direkt zu schreiben.
            </p>
          </div>
        `,
      }),
    });

    if (!res.ok) {
      return Response.json(
        { success: false, message: 'Fehler beim Senden.' },
        { status: 500, headers: cors(origin) }
      );
    }

    return Response.json({ success: true }, { headers: cors(origin) });
  },
};
