const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// POST-Route für Kontaktanfragen
app.post('/api/contact', async (req, res) => {
  const { anrede, vorname, nachname, phone, email, kurs, message } = req.body;

  // Einfache Validierung
  if (![anrede, vorname, nachname, phone, email, kurs].every(Boolean)) {
    return res.status(400).json({ error: 'Bitte alle Pflichtfelder ausfüllen.' });
  }

  // E-Mail-Inhalt vorbereiten
  const mailText = `
Neue Kontaktanfrage:

Anrede: ${anrede}
Vorname: ${vorname}
Nachname: ${nachname}
Telefon: ${phone}
E-Mail: ${email}
Kursauswahl: ${kurs}
Nachricht: ${message || '(keine Nachricht)'}
  `;

  try {
    // Gmail-Transporter
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: `"Circle of Life Anfrage" <${process.env.GMAIL_USER}>`,
      to: "mail.circleoflife@gmx.de",
      subject: `Probestunde Anfrage (${kurs})`,
      text: mailText,
      replyTo: email, // Damit du direkt antworten kannst
    });

    res.status(200).json({ success: true, message: 'Deine Anfrage wurde erfolgreich gesendet.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Beim Versand der E-Mail ist ein Fehler aufgetreten.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server läuft auf Port ${PORT}`));