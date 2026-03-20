export interface FaqItem {
  id:      string
  frage:   string
  antwort: string
  open?:   boolean
}

export const faqByPage: Record<string, FaqItem[]> = {

  bjj: [
    { id: 'bjj-1', frage: 'Was ist der Unterschied zwischen BJJ mit und ohne Gi?',
      antwort: 'Im Gi (Kimono) nutzt du den Stoff für Griffe und Techniken. No-Gi ist schneller und athletischer — beide Stile ergänzen sich perfekt.' },
    { id: 'bjj-2', frage: 'Wie lange dauert es bis zum ersten Gürtel?',
      antwort: 'Das ist individuell. Im BJJ gibt es keine festen Zeitvorgaben — Fortschritt hängt von Trainingsfrequenz, Technikverständnis und Sparring ab. Typisch sind 12–18 Monate bis zum Blauen Gürtel.' },
    { id: 'bjj-3', frage: 'Kann ich als Anfänger direkt mit dem Gi-Training starten?',
      antwort: 'Ja, absolut. Unser Fundamentals-Programm ist genau für Einsteiger konzipiert — du brauchst keine Vorkenntnisse.' },
    { id: 'bjj-4', frage: 'Was muss ich zum ersten Training mitbringen?',
      antwort: 'Sportkleidung und Flip-Flops genügen. Ein Gi ist nicht zwingend nötig — viele Einsteiger starten in normaler Sportkleidung.' },
  ],

  grappling: [
    { id: 'nogi-1', frage: 'Was ist No-Gi Grappling genau?',
      antwort: 'No-Gi Grappling ist Brazilian Jiu-Jitsu ohne Kimono. Du trainierst in Shorts und Rashguard — der Fokus liegt auf Körperkontrolle, Athletik und modernen Submissions wie Leglocks und Guillotines.' },
    { id: 'nogi-2', frage: 'Ist No-Gi auch für Einsteiger geeignet?',
      antwort: 'Ja. Viele Einsteiger starten sogar lieber mit No-Gi, weil die Techniken direkter und athletischer sind. Unser Trainer führt dich strukturiert ein.' },
    { id: 'nogi-3', frage: 'Was ist der Unterschied zu MMA?',
      antwort: 'Grappling ist der Bodenkampf-Anteil von MMA — ohne Schläge. Es ist ideal als eigenständige Kampfsportart und als Grundlage für MMA.' },
    { id: 'nogi-4', frage: 'Welche Ausrüstung brauche ich?',
      antwort: 'Kurze Sporthose (keine Reißverschlüsse) und ein Rashguard oder enges T-Shirt. Mehr brauchst du nicht für den Start.' },
  ],

  fitness: [
    { id: 'fit-1', frage: 'Muss ich schon fit sein um mitzumachen?',
      antwort: 'Nein. Das Conditioning-Training ist für alle Fitnesslevel ausgelegt. Du startest in deinem Tempo und steigerst dich mit der Zeit.' },
    { id: 'fit-2', frage: 'Ist das Training nur für BJJ-Athleten?',
      antwort: 'Nein — es ist ideal als Ergänzung für Kampfsportler, aber auch eigenständig nutzbar für alle die funktionale Kraft und Ausdauer aufbauen wollen.' },
    { id: 'fit-3', frage: 'Wie unterscheidet sich das von normalem Fitnessstudio?',
      antwort: 'Der Fokus liegt auf funktioneller Beweglichkeit, Gelenk-Stabilität und kampfsportspezifischer Kondition — nicht auf Maschinentraining.' },
    { id: 'fit-4', frage: 'Wie oft pro Woche sollte ich trainieren?',
      antwort: '2–3x pro Woche ist ideal. Du kannst das Conditioning-Training beliebig mit deinen BJJ-Einheiten kombinieren.' },
  ],

  kinder: [
    { id: 'kids-1', frage: 'Ab welchem Alter kann mein Kind anfangen?',
      antwort: 'Unser Kinder-BJJ ist für Kinder von 6 bis 13 Jahren. In dieser Zeit lernen Kinder am besten über Bewegung und Spiel — genau so ist unser Training aufgebaut.' },
    { id: 'kids-2', frage: 'Ist BJJ für Kinder gefährlich?',
      antwort: 'Nein. BJJ ist ein Kontaktsport ohne Schläge. Der Fokus liegt auf Technik, Kontrolle und gegenseitigem Respekt. Verletzungen sind beim strukturierten Kinder-Training sehr selten.' },
    { id: 'kids-3', frage: 'Hilft BJJ wirklich gegen Mobbing?',
      antwort: 'Ja — und zwar auf zwei Ebenen. Erstens: Kinder die sich sicher und körperlich kompetent fühlen, treten selbstbewusster auf und werden seltener als Ziel ausgewählt. Zweitens: Sie lernen in ruhiger, kontrollierter Atmosphäre wie man Konflikte deeskaliert.' },
    { id: 'kids-4', frage: 'Was lernt mein Kind konkret?',
      antwort: 'Grundbewegungen, Gleichgewicht, Fallschule, einfache Selbstverteidigungstechniken, Respekt, Disziplin und Teamgeist. Alles spielerisch vermittelt.' },
    { id: 'kids-5', frage: 'Wie groß sind die Kindergruppen?',
      antwort: 'Wir halten die Gruppen bewusst klein damit jedes Kind individuelle Aufmerksamkeit bekommt. Das ist uns wichtiger als große Mitgliedszahlen.' },
    { id: 'kids-6', frage: 'Kann ich als Elternteil zuschauen?',
      antwort: 'Natürlich! Du bist herzlich eingeladen beim Probetraining dabei zu sein und dir selbst ein Bild zu machen.' },
  ],

  zirkeltraining: [
    { id: 'zirkel-1', frage: 'Was ist Zirkeltraining genau?',
      antwort: 'Beim Zirkeltraining wechselst du in festgelegten Intervallen zwischen verschiedenen Übungsstationen. Das trainiert Kraft, Ausdauer und Koordination gleichzeitig — effektiv und abwechslungsreich.' },
    { id: 'zirkel-2', frage: 'Brauche ich Sporterfahrung für das Zirkeltraining?',
      antwort: 'Nein. Beide Kurse (Mamas und 60+) sind explizit für jedes Fitnesslevel ausgelegt. Jede Übung kann angepasst werden.' },
    { id: 'zirkel-3', frage: 'Kann ich mein Baby beim Mamas-Training mitbringen?',
      antwort: 'Ja — Babys und Kleinkinder sind ausdrücklich willkommen! Das Training ist so gestaltet dass du dein Kind dabei haben kannst.' },
    { id: 'zirkel-4', frage: 'Wie funktioniert die Zehnerkarte?',
      antwort: 'Du kaufst 10 Einheiten im Voraus für 100€. Kein Abo, keine Kündigung — du kommst wann es dir passt und nutzt eine Einheit pro Besuch.' },
    { id: 'zirkel-5', frage: 'Ist das 60+ Training auch bei körperlichen Einschränkungen möglich?',
      antwort: 'Ja. Wir passen Übungen individuell an. Wichtig ist die regelmäßige Bewegung — nicht die Intensität. Sprich uns beim Probetraining einfach an.' },
  ],

  'ueber-uns': [
    { id: 'about-1', frage: 'Wer trainiert bei Circle of Life BJJ?',
      antwort: 'Wir haben über 60 aktive Mitglieder — Einsteiger, Fortgeschrittene, Wettkämpfer, Kinder und Erwachsene jeden Alters. Viele kommen aus Ludwigshafen, Mannheim, Frankenthal und der ganzen Pfalz.' },
    { id: 'about-2', frage: 'Was macht euer Gym besonders?',
      antwort: 'Familiäre Atmosphäre, strukturierter Lernpfad und ein erfahrener Headcoach der "Position before Submission" lehrt. Kein Ego-Training — jeder wird respektvoll behandelt.' },
    { id: 'about-3', frage: 'Gibt es Wettkampfmöglichkeiten?',
      antwort: 'Ja. Wer möchte kann an regionalen und nationalen BJJ-Turnieren teilnehmen. Wettkampf ist keine Pflicht — aber wer will, wird gezielt vorbereitet.' },
    { id: 'about-4', frage: 'Wie finde ich euch?',
      antwort: 'Am Herrschaftsweiher 17, 67071 Ludwigshafen-Ruchheim. Parkplätze direkt vor der Tür. Mit dem ÖPNV: Straßenbahnlinie 4 bis Ruchheim Bahnhof, dann 5 Minuten zu Fuß.' },
  ],
}

export const faqs: FaqItem[] = [
  {
    id:      'faq-1',
    frage:   'Brauche ich Vorerfahrung im Kampfsport?',
    antwort: 'Nein, Einsteiger sind ausdrücklich willkommen. Wir starten mit Fundamentals und führen dich Schritt für Schritt ins Training ein.',
  },
  {
    id:      'faq-2',
    frage:   'Was soll ich zum Probetraining mitbringen?',
    antwort: 'Bequeme Sportkleidung und Flip-Flops genügen. Falls du schon ein Gi besitzt, kannst du ihn gerne mitbringen. Alles Weitere erklären wir vor Ort.',
  },
  {
    id:      'faq-3',
    frage:   'Ist das Probetraining wirklich kostenlos?',
    antwort: 'Ja, das Probetraining ist vollkommen kostenlos und unverbindlich. So kannst du uns und den Sport ganz entspannt kennenlernen.',
  },
  {
    id:      'faq-4',
    frage:   'Kann ich auch als Frau oder Kind teilnehmen?',
    antwort: 'Absolut! Wir haben spezielle Kindertrainings sowie viele Frauen im Training. Alle sind willkommen – unabhängig von Alter oder Geschlecht.',
  },
]
