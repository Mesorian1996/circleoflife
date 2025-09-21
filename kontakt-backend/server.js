// server.js
import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

// Zum Entschärfen von Sonderzeichen (sicheres Einfügen in HTML)
const esc = (s = "") =>
  String(s).replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));



const app = express();
const port = process.env.PORT || 3000;

/* === CORS: exakte Origins + Preflight freigeben === */
const corsOptions = {
  origin: [
    'http://127.0.0.1:5500',
    'http://localhost:5500',
    'https://circleoflife-bjj.de',
    'https://www.circleoflife-bjj.de'
  ],
  methods: ['GET','POST','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization'],
  credentials: false
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // <— wichtig: antwortet auf Preflight

/* === Body Parser === */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/healthz', (_req,res)=>res.json({ ok:true }));

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

  const text = `Hallo Marvin,

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
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_PASS }
    });

    await transporter.sendMail({
      from: `"Circle of Life BJJ" <${process.env.GMAIL_USER}>`,
      to: process.env.MAIL_TO || 'mesorian96@gmx.de',
      replyTo: email || undefined,
      subject,
      text,
      html
    });

    res.json({ message: 'E-Mail erfolgreich gesendet ✅' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Fehler beim E-Mail-Versand ❌' });
  }
});


app.listen(port, () => console.log(`Mailer ready on :${port}`));
