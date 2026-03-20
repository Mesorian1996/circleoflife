export interface PreisCard {
  id:           string
  titel:        string
  preisText:    string
  periode:      string
  beschreibung: string
  features:     string[]
  ctaLabel:     string
  ctaHref:      string
  highlighted:  boolean
  badge?:       string
  hinweis?:     string
}

export const preise: PreisCard[] = [
  {
    id:           'erwachsene',
    titel:        'Erwachsene',
    preisText:    '80€',
    periode:      '/ Monat',
    beschreibung: 'Gi & No-Gi für Einsteiger bis Wettkämpfer',
    features: [
      'Gi (BJJ) & No-Gi Grappling',
      'Open Mat & Competition Class',
      'Alle Level – Einsteiger willkommen',
      '6x Training pro Woche',
    ],
    ctaLabel:    'Probetraining sichern',
    ctaHref:     '/#probetraining',
    highlighted: true,
    badge:       'Meistgewählt',
  },
  {
    id:           'kids',
    titel:        'Kids (6–13 Jahre)',
    preisText:    '50€',
    periode:      '/ Monat',
    beschreibung: 'Spielerisch Kampfsport lernen',
    features: [
      'Selbstverteidigung & Selbstvertrauen',
      'Spielerische Technikvermittlung',
      'Respektvoller Umgang',
      'Geschwisterrabatt: 30€ / Kind',
    ],
    ctaLabel:    'Jetzt starten',
    ctaHref:     '/#probetraining',
    highlighted: false,
  },
  {
    id:           'studierende',
    titel:        'Studierende',
    preisText:    '70€',
    periode:      '/ Monat',
    beschreibung: 'Mit gültigem Studierendenausweis',
    features: [
      'Gi & No-Gi inklusive',
      'Flexible Trainingszeiten',
      '−12,5% gegenüber Vollpreis',
      'Gültig mit Studierendenausweis',
    ],
    ctaLabel:    'Jetzt starten',
    ctaHref:     '/#probetraining',
    highlighted: false,
  },
  {
    id:           'zehner',
    titel:        '10er-Karte',
    preisText:    '150€',
    periode:      '/ 10 Einheiten',
    beschreibung: 'Flexibel ohne Mitgliedschaft',
    features: [
      'Für Gi & No-Gi nutzbar',
      'Ideal bei unregelmäßigen Zeiten',
      'Keine Mitgliedschaft nötig',
      'Kein Ablaufdatum',
    ],
    ctaLabel:    'Anfragen',
    ctaHref:     '/#probetraining',
    highlighted: false,
  },
  {
    id:           'zirkel',
    titel:        'Zirkeltraining',
    preisText:    '100€',
    periode:      '/ 10 Einheiten',
    beschreibung: 'Mamas & 60+ — dienstags in Ruchheim',
    features: [
      'Zirkel Mamas: Di 10:00–11:00 Uhr',
      'Zirkel 60+: Di 11:15–12:15 Uhr',
      'Baby & Kleinkind willkommen',
      'Für jedes Fitnesslevel geeignet',
    ],
    ctaLabel:    'Jetzt anmelden',
    ctaHref:     '/#probetraining',
    highlighted: false,
    badge:       'Neu',
    hinweis:     'Zehnerkarte — keine Mitgliedschaft nötig',
  },
]

export const preisHinweise = [
  'Einmalige Anmeldegebühr: 40€',
  'Zahlung monatlich, Kündigung 4 Wochen zum Monatsende',
]
