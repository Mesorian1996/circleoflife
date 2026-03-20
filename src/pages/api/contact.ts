import type { APIRoute } from 'astro';
import { Resend } from 'resend';

export const prerender = false;

const esc = (s = '') =>
  String(s).replace(/[&<>"']/g, (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m] ?? m));

const allowedOrigins = (import.meta.env.ALLOWED_ORIGINS ?? '')
  .split(',')
  .map((o: string) => o.trim())
  .filter(Boolean);

function corsHeaders(origin: string | null): Record<string, string> {
  const allowed =
    origin && allowedOrigins.length > 0
      ? allowedOrigins.includes(origin)
        ? origin
        : allowedOrigins[0]
      : '*';
  return {
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

export const OPTIONS: APIRoute = ({ request }) => {
  const origin = request.headers.get('origin');
  return new Response(null, { status: 204, headers: corsHeaders(origin) });
};

export const POST: APIRoute = async ({ request }) => {
  const origin = request.headers.get('origin');
  const headers = { 'Content-Type': 'application/json', ...corsHeaders(origin) };

  let body: Record<string, string>;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ ok: false, message: 'Ungültige Anfrage.' }), { status: 400, headers });
  }

  const { anrede = '', vorname = '', nachname = '', email = '', phone = '', kurs = '', message = '' } = body;

  if ((!vorname && !nachname) || !email) {
    return new Response(
      JSON.stringify({ ok: false, message: 'Bitte Name und E-Mail angeben.' }),
      { status: 400, headers }
    );
  }

  const resendKey = import.meta.env.RESEND_API_KEY;
  if (!resendKey) {
    return new Response(
      JSON.stringify({ ok: false, message: 'Server-Konfigurationsfehler.' }),
      { status: 500, headers }
    );
  }

  const resend = new Resend(resendKey);
  const fullName = [anrede, vorname, nachname].filter(Boolean).join(' ').trim();
  const subject = `Neue Anfrage zum Probetraining von ${fullName || 'Unbekannt'}`;

  const html = `
    <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;line-height:1.55;color:#111827;">
      <p>Hallo Marvin,</p>
      <p>eine neue Anfrage zum Probetraining ist eingetroffen 🙂</p>
      <hr style="border:none;border-top:1px solid #E5E7EB;margin:12px 0"/>
      <p><strong>Vorname:</strong> ${esc(vorname) || '–'}</p>
      <p><strong>Nachname:</strong> ${esc(nachname) || '–'}</p>
      <p><strong>Telefon:</strong> ${esc(phone) || '–'}</p>
      <p><strong>E-Mail:</strong> ${esc(email) || '–'}</p>
      <p><strong>Kurs:</strong> ${esc(kurs) || '–'}</p>
      <p><strong>Nachricht:</strong><br>${esc(message).replace(/\n/g, '<br>') || '–'}</p>
      <hr style="border:none;border-top:1px solid #E5E7EB;margin:12px 0"/>
      <p style="font-size:12px;color:#6B7280;">Antworte einfach auf diese E-Mail, um der Person direkt zu schreiben.</p>
    </div>
  `;

  const text = `Hallo Marvin,\n\neine neue Anfrage zum Probetraining.\n\nVorname: ${vorname || '–'}\nNachname: ${nachname || '–'}\nTelefon: ${phone || '–'}\nE-Mail: ${email || '–'}\nKurs: ${kurs || '–'}\n\nNachricht:\n${message || '–'}`;

  try {
    const fromName = import.meta.env.FROM_NAME || 'Circle of Life BJJ';
    const fromEmail = import.meta.env.FROM_EMAIL || 'no-reply@circleoflife-bjj.de';
    const mailTo = import.meta.env.MAIL_TO || fromEmail;

    const { data, error } = await resend.emails.send({
      from: `${fromName} <${fromEmail}>`,
      to: [mailTo],
      reply_to: email,
      subject,
      html,
      text,
    });

    if (error) throw error;
    return new Response(
      JSON.stringify({ ok: true, message: 'Oss! E-Mail erfolgreich gesendet ✅', id: data?.id }),
      { status: 200, headers }
    );
  } catch (err) {
    console.error('CONTACT_ERROR:', err);
    return new Response(
      JSON.stringify({ ok: false, message: 'E-Mail Versand aktuell nicht möglich. Bitte später erneut versuchen.' }),
      { status: 502, headers }
    );
  }
};
