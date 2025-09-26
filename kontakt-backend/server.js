// server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Resend } from 'resend';
dotenv.config();

// HTML-Escaping
const esc = (s = "") =>
  String(s).replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));

// ===== App Setup =====
const app = express();
const port = process.env.PORT || 3000;

const corsOptions = {
  origin: [
    'http://127.0.0.1:5500',
    'http://localhost:5500',
    'https://circleoflife-bjj.de',
    'https://www.circleoflife-bjj.de'
  ],
  methods: ['GET','POST','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization'],
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/healthz', (_req,res)=>res.json({ ok:true }));

// ===== Resend (HTTPS, kein SMTP) =====
const resend = new Resend(process.env.RESEND_API_KEY);

// ===== Route =====
app.post('/api/contact', async (req, res) => {
  const {
    anrede = '',
    vorname = '',
    nachname = '',
    email = '',
    phone = '',
    kurs = '',
    message = ''
  } = req.body || {};
  // NEU (message optional):
  if ((!vorname && !nachname) || !email) {
    return res.status(400).json({ ok:false, message: 'Bitte Name und E-Mail angeben.' });
  }

  const fullName = [anrede, vorname, nachname].filter(Boolean).join(' ').trim();
  const subject = `Neue Anfrage zum Probetraining von ${fullName || 'Unbekannt'}`;

  const html = `
    <div style="font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; line-height:1.55; color:#111827;">
      <p>Hallo Marvin,</p>
      <p>eine neue Anfrage zum Probetraining ist eingetroffen 🙂</p>
      <hr style="border:none;border-top:1px solid #E5E7EB;margin:12px 0" />
      <p><strong>Vorname:</strong> ${esc(vorname) || '–'}</p>
      <p><strong>Nachname:</strong> ${esc(nachname) || '–'}</p>
      <p><strong>Telefon:</strong> ${esc(phone) || '–'}</p>
      <p><strong>E-Mail:</strong> ${esc(email) || '–'}</p>
      <p><strong>Kurs:</strong> ${esc(kurs) || '–'}</p>
      <p><strong>Nachricht:</strong><br>${esc(message).replace(/\n/g,'<br>') || '–'}</p>
      <hr style="border:none;border-top:1px solid #E5E7EB;margin:12px 0" />
      <p style="font-size:12px;color:#6B7280;">Antworte einfach auf diese E-Mail, um der Person direkt zu schreiben.</p>
    </div>
  `;

  const text =
`Hallo Marvin,

eine neue Anfrage zum Probetraining ist eingetroffen.

Vorname: ${vorname || '–'}
Nachname: ${nachname || '–'}
Telefon: ${phone || '–'}
E-Mail: ${email || '–'}
Kurs: ${kurs || '–'}

Nachricht:
${message || '–'}
`;

  try {
    const fromName = process.env.FROM_NAME || 'Circle of Life BJJ';
    const fromEmail = process.env.FROM_EMAIL || 'no-reply@example.com';

    const { data, error } = await resend.emails.send({
      from: `${fromName} <${fromEmail}>`,
      to: [process.env.MAIL_TO || fromEmail],
      reply_to: email,
      subject,
      html,
      text
    });

    if (error) throw error;
    return res.json({ ok:true, message: 'Oss! E-Mail erfolgreich gesendet ✅', id: data?.id });
  } catch (err) {
    console.error('CONTACT_ERROR:', err);
    return res.status(502).json({ ok:false, message: 'E-Mail Versand aktuell nicht möglich. Bitte später erneut versuchen.' });
  }
});

app.listen(port, () => console.log(`Mailer ready on :${port}`));
