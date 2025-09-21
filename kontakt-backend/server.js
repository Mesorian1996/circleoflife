import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: `"Kontaktformular" <${process.env.GMAIL_USER}>`,
      to: 'mesorian96@gmx.de',
      replyTo: email,
      subject: `Neue Nachricht von ${name}`,
      text: message
    });

    res.status(200).json({ message: 'E-Mail erfolgreich gesendet ✅' });
  } catch (error) {
    console.error('Fehler beim Senden:', error);
    res.status(500).json({ message: 'Fehler beim E-Mail-Versand ❌' });
  }
});

app.listen(port, () => {
  console.log(`🚀 Server läuft auf Port ${port}`);
});