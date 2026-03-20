export interface Zirkelkurs {
  titel: string;
  tag: string;
  von: string;
  bis: string;
  beschreibung: string;
  zielgruppe: string;
  preis: number | null;
  preisHinweis: string;
  features: string[];
}

export const zirkelkurse: Zirkelkurs[] = [
  {
    titel: 'Zirkeltraining für Mamas',
    tag: 'Di',
    von: '10:00',
    bis: '11:00',
    beschreibung:
      'Gönne dir Zeit für dich und gewinne neue Energie im Alltag! Unser Zirkeltraining für Mamas kombiniert effektive Ganzkörperübungen, sanften Muskelaufbau und ein liebevolles Gemeinschaftsgefühl. Egal ob frisch nach der Rückbildung oder schon länger im Mama-Alltag – du trainierst gemeinsam mit deinem Baby in deinem Tempo und wirst professionell begleitet. Mehr Kraft, mehr Wohlbefinden, mehr Zeit für dich.',
    zielgruppe: 'Mamas mit Baby & Kleinkind willkommen',
    preis: null,
    preisHinweis: 'Auf Anfrage',
    features: [
      'Ganzkörper-Zirkeltraining',
      'Sanfter Muskelaufbau',
      'Baby darf mit',
      'Professionelle Begleitung',
      'Jedes Fitnesslevel',
    ],
  },
  {
    titel: 'Zirkeltraining 60+',
    tag: 'Di',
    von: '11:15',
    bis: '12:15',
    beschreibung:
      'Bleib aktiv und genieße Bewegung in guter Gesellschaft! Unser Zirkeltraining für die Generation 60+ stärkt Kraft, Mobilität und Gleichgewicht – angepasst an dein Tempo, ohne Druck. Familiäre Atmosphäre, persönliche Begleitung und ein fester Dienstagstreffpunkt. Flexibel per Zehnerkarte, ohne Mitgliedschaft.',
    zielgruppe: 'Ab 60 Jahren, jedes Fitnesslevel',
    preis: 100,
    preisHinweis: 'Zehnerkarte 100\u00a0€',
    features: [
      'Ganzkörper-Zirkeltraining',
      'Kräftigung',
      'Mobilität',
      'Gleichgewicht',
      'Für jedes Fitnesslevel',
    ],
  },
];
