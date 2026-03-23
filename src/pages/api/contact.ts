import type { APIRoute } from 'astro';
import { Resend } from 'resend';

export const POST: APIRoute = async ({ request }) => {
  const resend = new Resend(import.meta.env.RESEND_API_KEY);
  const data = await request.formData();

  const anrede   = data.get('anrede')?.toString() ?? '';
  const vorname  = data.get('vorname')?.toString() ?? '';
  const nachname = data.get('nachname')?.toString() ?? '';
  const email    = data.get('email')?.toString() ?? '';
  const phone    = data.get('phone')?.toString() ?? '';
  const kurs     = data.get('kurs')?.toString() ?? '';
  const message  = data.get('message')?.toString() ?? '';

  if (!vorname || !email) {
    return new Response(
      JSON.stringify({ success: false, message: 'Pflichtfelder fehlen.' }),
      { status: 400 }
    );
  }

  const { error } = await resend.emails.send({
    from: `Circle of Life BJJ <${import.meta.env.RESEND_FROM}>`,
    to: [import.meta.env.RESEND_TO],
    replyTo: email,
    subject: `Neue Anfrage zum Probetraining von ${anrede} ${vorname} ${nachname}`,
    html: `
    <div style="font-family: sans-serif; color: #111; max-width: 560px;">
        <p>Hallo Marvin,</p>
        <p>eine neue Anfrage zum Probetraining ist eingetroffen 🙂</p>
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
        <p><strong>Anrede:</strong> ${anrede || '–'}</p>
        <p><strong>Vorname:</strong> ${vorname}</p>
        <p><strong>Nachname:</strong> ${nachname}</p>
        <p><strong>Telefon:</strong> ${phone || '–'}</p>
        <p><strong>E-Mail:</strong> ${email}</p>
        <p><strong>Kurs:</strong> ${kurs || '–'}</p>
        <p><strong>Nachricht:</strong><br/>${message || '–'}</p>
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
        <p style="color: #6b7280; font-size: 13px;">
        Antworte einfach auf diese E-Mail, um der Person direkt zu schreiben.
        </p>
    </div>
    `,
  });

  if (error) {
    return new Response(
      JSON.stringify({ success: false, message: 'Fehler beim Senden.' }),
      { status: 500 }
    );
  }

  return new Response(JSON.stringify({ success: true }), { status: 200 });
};