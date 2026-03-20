export type KursTyp = 'gi' | 'nogi' | 'kids' | 'fitness' | 'zirkel';
export type Tag = 'Mo' | 'Di' | 'Mi' | 'Do' | 'Fr' | 'Sa' | 'So';

export interface Kurs {
  id: string;
  typ: KursTyp;
  tag: Tag;
  start: string;
  end: string;
  titel: string;
  href?: string;
}

export const kursStyles: Record<
  KursTyp,
  { cssClass: string; dot: string; label: string }
> = {
  gi:      { cssClass: 'gi',      dot: '#bfa24a', label: 'Gi' },
  nogi:    { cssClass: 'nogi',    dot: '#5d626c', label: 'No-Gi' },
  kids:    { cssClass: 'kids',    dot: '#5269b6', label: 'Kids' },
  fitness: { cssClass: 'fitness', dot: '#3d9970', label: 'Fitness' },
  zirkel:  { cssClass: 'zirkel', dot: '#0d9488', label: 'Zirkel' },
};

export const ALL_DAYS: Tag[] = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];

export const kurse: Kurs[] = [
  // Dienstag — Zirkeltraining
  { id: 'di-zirkel-mamas', typ: 'zirkel', tag: 'Di', start: '10:00', end: '11:00', titel: 'Zirkel Mamas', href: '/zirkeltraining' },
  { id: 'di-zirkel-60',    typ: 'zirkel', tag: 'Di', start: '11:15', end: '12:15', titel: 'Zirkel 60+',   href: '/zirkeltraining' },
  // Montag
  { id: 'mo-kids', typ: 'kids', tag: 'Mo', start: '17:00', end: '18:00', titel: 'Kids',   href: '/kinder'    },
  { id: 'mo-nogi', typ: 'nogi', tag: 'Mo', start: '18:00', end: '19:30', titel: 'No-Gi', href: '/grappling'  },
  { id: 'mo-gi',   typ: 'gi',   tag: 'Mo', start: '19:30', end: '21:00', titel: 'Gi',    href: '/bjj'        },
  // Mittwoch
  { id: 'mi-kids', typ: 'kids', tag: 'Mi', start: '17:00', end: '18:00', titel: 'Kids',   href: '/kinder'    },
  { id: 'mi-gi',   typ: 'gi',   tag: 'Mi', start: '18:00', end: '19:30', titel: 'Gi',    href: '/bjj'        },
  { id: 'mi-nogi', typ: 'nogi', tag: 'Mi', start: '19:30', end: '21:00', titel: 'No-Gi', href: '/grappling'  },
  // Freitag
  { id: 'fr-nogi', typ: 'nogi', tag: 'Fr', start: '18:00', end: '19:30', titel: 'No-Gi', href: '/grappling'  },
  { id: 'fr-gi',   typ: 'gi',   tag: 'Fr', start: '19:30', end: '21:00', titel: 'Gi',    href: '/bjj'        },
];

/** Unique time slots sorted by start time */
export function getSlots(): { start: string; end: string; label: string }[] {
  const seen = new Set<string>();
  const out: { start: string; end: string; label: string }[] = [];
  for (const k of kurse) {
    const key = k.start;
    if (!seen.has(key)) {
      seen.add(key);
      out.push({ start: k.start, end: k.end, label: `${k.start} – ${k.end}` });
    }
  }
  return out.sort((a, b) => a.start.localeCompare(b.start));
}

/** Find a Kurs by tag and slot start */
export function findKurs(tag: Tag, slotStart: string): Kurs | undefined {
  return kurse.find(k => k.tag === tag && k.start === slotStart);
}

/** Days that have at least one Kurs */
export function getActiveDays(): Tag[] {
  const set = new Set(kurse.map(k => k.tag));
  return ALL_DAYS.filter(d => set.has(d));
}
