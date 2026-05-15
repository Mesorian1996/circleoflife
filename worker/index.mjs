const ALLOWED_ORIGIN = 'https://circleoflife-bjj.de';

// ─── Design System ─────────────────────────────────────────────────────────────
const EMAIL_BRAND = {
  primary:     '#14182b',
  accent:      '#bfa24a',
  bg:          '#f7f8fa',
  cardBg:      '#ffffff',
  border:      '#e4e6ec',
  textHeading: '#14182b',
  textBody:    '#3f4a60',
  textMuted:   '#8896a8',
  darkBg:      '#1a1a1a',
  darkCard:    '#2a2a2a',
  darkBorder:  '#3a3a3a',
  darkText:    '#f0ede8',
  fontSans:    '"Helvetica Neue", Helvetica, Arial, sans-serif',
  companyName: 'Circle of Life BJJ',
  companyUrl:  'https://circleoflife-bjj.de',
};

const FIELD_LABELS = {
  anrede:   'Anrede',
  vorname:  'Vorname',
  nachname: 'Nachname',
  email:    'E-Mail',
  phone:    'Telefon',
  kurs:     'Kurs',
  message:  'Nachricht',
};

// ─── Plain Text Fallback ────────────────────────────────────────────────────────
function buildEmailText(data) {
  const lines = [
    `Neue Probetraining-Anfrage — ${EMAIL_BRAND.companyName}`,
    '─'.repeat(40),
    '',
  ];
  for (const [key, value] of Object.entries(data)) {
    const label = FIELD_LABELS[key] || key;
    lines.push(`${label}: ${value || '–'}`);
  }
  lines.push('', '─'.repeat(40));
  lines.push(EMAIL_BRAND.companyUrl);
  return lines.join('\n');
}

// ─── HTML Email ─────────────────────────────────────────────────────────────────
function buildEmailHtml(data) {
  const b = EMAIL_BRAND;

  const fieldRows = Object.entries(data)
    .filter(([key]) => key !== 'botcheck')
    .map(([key, value]) => {
      const label = FIELD_LABELS[key] || key;
      const safeValue = String(value || '–')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
      return `
        <tr class="field-row" style="border-bottom: 1px solid ${b.border};">
          <td style="padding: 12px 0;">
            <div class="field-label" style="font-family: ${b.fontSans}; font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; color: ${b.textMuted}; margin-bottom: 4px;">
              ${label}
            </div>
            <div class="field-value" style="font-family: ${b.fontSans}; font-size: 15px; color: ${b.textHeading}; line-height: 1.5;">
              ${safeValue}
            </div>
          </td>
        </tr>`;
    }).join('');

  const senderName = [data.vorname, data.nachname].filter(Boolean).join(' ') || 'Unbekannt';
  const replyTo = data.email || '';

  return `<!DOCTYPE html>
<html lang="de" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <!--[if mso]>
  <noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript>
  <![endif]-->
  <style>
    @media (prefers-color-scheme: dark) {
      body, .email-bg { background-color: ${b.darkBg} !important; }
      .email-card { background-color: ${b.darkCard} !important; border-color: ${b.darkBorder} !important; }
      .field-value { color: ${b.darkText} !important; }
      .field-label { color: #888 !important; }
      .field-row { border-color: ${b.darkBorder} !important; }
      .footer-text { color: #666 !important; }
      .divider { background-color: ${b.darkBorder} !important; }
    }
    @media screen and (max-width: 620px) {
      .email-container { width: 100% !important; }
      .email-header, .email-card { padding-left: 24px !important; padding-right: 24px !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: ${b.bg}; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;">

<div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">
  Neue Probetraining-Anfrage von ${senderName} &#8203;&zwnj;&#8203;&zwnj;&#8203;&zwnj;&#8203;
</div>

<table class="email-bg" width="100%" cellpadding="0" cellspacing="0" border="0"
  style="background-color: ${b.bg}; min-height: 100vh;">
  <tr>
    <td align="center" style="padding: 40px 16px 60px;">

      <table class="email-container" width="600" cellpadding="0" cellspacing="0" border="0"
        style="max-width: 600px; width: 100%;">

        <!-- HEADER -->
        <tr>
          <td class="email-header" style="background-color: ${b.primary}; padding: 28px 40px 24px; border-radius: 14px 14px 0 0;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="vertical-align: middle;">
                  <div style="font-family: ${b.fontSans}; font-size: 17px; font-weight: 800; color: ${b.accent}; letter-spacing: 0.08em; text-transform: uppercase;">
                    ${b.companyName}
                  </div>
                  <div style="font-family: ${b.fontSans}; font-size: 11px; color: rgba(255,255,255,0.45); margin-top: 5px; letter-spacing: 0.05em;">
                    Neue Probetraining-Anfrage eingegangen
                  </div>
                </td>
                <td style="vertical-align: middle;" align="right">
                  <table cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td width="42" height="42" style="background: linear-gradient(135deg, #ffe17c, #bfa24a); border-radius: 50%; text-align: center; vertical-align: middle;">
                        <span style="font-size: 18px; line-height: 42px; color: ${b.primary};">✉</span>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- ACCENT BAR -->
        <tr>
          <td style="height: 3px; background: linear-gradient(to right, #f5c84b, #bfa24a88, transparent);"></td>
        </tr>

        <!-- CARD -->
        <tr>
          <td class="email-card" style="background-color: ${b.cardBg}; padding: 36px 40px 32px; border: 1px solid ${b.border}; border-top: none; border-radius: 0 0 14px 14px;">

            <p style="margin: 0 0 28px; font-family: ${b.fontSans}; font-size: 14px; color: ${b.textBody}; line-height: 1.7;">
              Hallo Marvin, eine neue Anfrage ist über das Kontaktformular eingegangen. Alle Details im Überblick:
            </p>

            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              ${fieldRows}
            </table>

            <div style="height: 28px;"></div>

            <div class="divider" style="height: 1px; background-color: ${b.border}; margin-bottom: 28px;"></div>

            <table cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td>
                  <!--[if mso]>
                  <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml"
                    href="mailto:${replyTo}"
                    style="height:44px;v-text-anchor:middle;width:180px;"
                    arcsize="50%"
                    strokecolor="${b.accent}"
                    fillcolor="${b.accent}">
                    <w:anchorlock/>
                    <center style="color:${b.primary};font-family:Helvetica,Arial,sans-serif;font-size:13px;font-weight:700;">
                      Direkt antworten
                    </center>
                  </v:roundrect>
                  <![endif]-->
                  <!--[if !mso]><!-->
                  <a href="mailto:${replyTo}"
                    style="display: inline-block; padding: 13px 28px; background: linear-gradient(135deg, #f5c84b, #bfa24a); color: ${b.primary}; font-family: ${b.fontSans}; font-size: 13px; font-weight: 700; text-decoration: none; border-radius: 100px; letter-spacing: 0.03em;">
                    Direkt antworten
                  </a>
                  <!--<![endif]-->
                </td>
              </tr>
            </table>

          </td>
        </tr>

        <!-- FOOTER -->
        <tr>
          <td style="padding: 24px 0 0; text-align: center;">
            <p class="footer-text" style="margin: 0; font-family: ${b.fontSans}; font-size: 11px; color: ${b.textMuted}; line-height: 1.8;">
              Diese E-Mail wurde automatisch generiert &middot;
              <a href="${b.companyUrl}" style="color: ${b.accent}; text-decoration: none;">${b.companyUrl}</a>
            </p>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>

</body>
</html>`;
}

// ─── Admin Alert (Fehlerfall) ────────────────────────────────────────────────────
async function sendAdminAlert(env, { vorname, nachname, email, phone, kurs, message, anrede, errText }) {
  const b = EMAIL_BRAND;
  try {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `Circle of Life BJJ <${env.RESEND_FROM}>`,
        to: [env.RESEND_TO],
        subject: `⚠️ Fehler – Probetraining-Anfrage nicht zugestellt`,
        html: `<!DOCTYPE html>
<html lang="de">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f7f8fa;">
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f7f8fa;">
  <tr><td align="center" style="padding:40px 16px;">
    <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;">
      <tr>
        <td style="background:${b.primary};padding:24px 40px 20px;border-radius:14px 14px 0 0;">
          <div style="font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:800;color:#b91c1c;letter-spacing:0.06em;text-transform:uppercase;">
            ⚠️ ${b.companyName} — Zustellungsfehler
          </div>
        </td>
      </tr>
      <tr><td style="height:3px;background:linear-gradient(to right,#b91c1c,#ef444488,transparent);"></td></tr>
      <tr>
        <td style="background:#fff;padding:32px 40px;border:1px solid #e4e6ec;border-top:none;border-radius:0 0 14px 14px;">
          <p style="margin:0 0 16px;font-family:Helvetica,Arial,sans-serif;font-size:14px;color:#b91c1c;font-weight:700;">
            Eine Probetraining-Anfrage konnte nicht zugestellt werden. Bitte nimm manuell Kontakt auf:
          </p>
          <table width="100%" cellpadding="0" cellspacing="0" border="0">
            ${[
              ['Anrede', anrede],
              ['Vorname', vorname],
              ['Nachname', nachname],
              ['E-Mail', email],
              ['Telefon', phone],
              ['Kurs', kurs],
              ['Nachricht', message],
            ].map(([label, value]) => `
              <tr style="border-bottom:1px solid #e4e6ec;">
                <td style="padding:10px 0;">
                  <div style="font-family:Helvetica,Arial,sans-serif;font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:0.1em;color:#8896a8;margin-bottom:3px;">${label}</div>
                  <div style="font-family:Helvetica,Arial,sans-serif;font-size:14px;color:#14182b;">${String(value || '–').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}</div>
                </td>
              </tr>`).join('')}
          </table>
          <div style="margin-top:24px;padding:12px 16px;background:#fef2f2;border-radius:8px;border:1px solid #fecaca;">
            <div style="font-family:Helvetica,Arial,sans-serif;font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:0.1em;color:#8896a8;margin-bottom:4px;">Resend-Fehler</div>
            <div style="font-family:monospace;font-size:12px;color:#b91c1c;">${String(errText || '–').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}</div>
          </div>
        </td>
      </tr>
    </table>
  </td></tr>
</table>
</body>
</html>`,
      }),
    });
  } catch {
    // best effort
  }
}

// ─── CORS ───────────────────────────────────────────────────────────────────────
function cors(origin) {
  const allowed = origin === ALLOWED_ORIGIN ? origin : ALLOWED_ORIGIN;
  return {
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

// ─── Worker ─────────────────────────────────────────────────────────────────────
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

    const senderName = [anrede, vorname, nachname].filter(Boolean).join(' ');
    const emailData  = { anrede, vorname, nachname, email, phone, kurs, message };

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from:     `Circle of Life BJJ <${env.RESEND_FROM}>`,
        to:       [env.RESEND_TO],
        reply_to: email,
        subject:  `Neue Probetraining-Anfrage von ${senderName}`,
        html:     buildEmailHtml(emailData),
        text:     buildEmailText(emailData),
      }),
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => '');
      await sendAdminAlert(env, { vorname, nachname, email, phone, kurs, message, anrede, errText });
      return Response.json(
        { success: false, message: 'Leider ist ein Fehler beim Senden aufgetreten. Bitte ruf uns an oder schreib uns eine WhatsApp.' },
        { status: 500, headers: cors(origin) }
      );
    }

    return Response.json({ success: true }, { headers: cors(origin) });
  },
};
