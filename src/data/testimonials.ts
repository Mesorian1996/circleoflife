export interface Testimonial {
  name:   string
  role?:  string
  rating: number
  text:   string
  ago:    string
}

export const testimonials: Testimonial[] = [
  {
    name:   'Mesorian Limani',
    rating: 5,
    ago:    'vor 5 Monaten',
    text:   'Ich kann die Akademie nur empfehlen. Die Atmosphäre ist sehr gut, das Training ist für alle Erfahrungsstufen geeignet und es herrscht ein respektvoller Umgang. Hier ist jeder willkommen und das spürt man auch. Der Headcoach lehrt auch ein strukturiertes System.',
  },
  {
    name:   'Tanja S',
    role:   'Local Guide',
    rating: 5,
    ago:    'vor 4 Monaten',
    text:   'Neueröffnete Kampfsportschule mit viel Erfahrung. Man merkt, dass der Inhaber mit Herzblut hinter seiner Academy steht und viel investiert. Bereits jetzt schon ein tolles Team und sehr herzlich.',
  },
  {
    name:   'Anna',
    rating: 5,
    ago:    'vor 3 Monaten',
    text:   'Als Frau war ich am Anfang skeptisch, ein Jiu Jitsu Probetraining zu machen. Jedoch habe ich mich schon nach dem ersten Training angemeldet und bin immer noch sehr glücklich mit meiner Entscheidung! Der Trainer nimmt sich für jeden Zeit und geht individuell auf die Leute ein.',
  },
  {
    name:   'Steven Ritter',
    rating: 5,
    ago:    'vor einem Monat',
    text:   'Das Training ist auf höchstem Niveau, technisch sauber, strukturiert und trotzdem super motivierend. Marvin ist nicht nur extrem kompetent, sondern nimmt sich wirklich Zeit für jeden Einzelnen. Egal ob Anfänger oder Fortgeschrittener, hier wird jeder gefordert und gefördert. Mega respektvolle Atmosphäre.',
  },
  {
    name:   'J. D.',
    role:   'Local Guide',
    rating: 5,
    ago:    'vor 2 Monaten',
    text:   'Ich bin erst vor kurzem arbeitsbedingt in die Region gezogen und habe mir einige BJJ Akademien angeschaut. Die Akademie von Marvin hat mir am besten gefallen, besonders was das Trainingskonzept und den Umgang miteinander angeht.',
  },
]

export const googlePlaceId = 'ChIJpeOTqUgzV0cRu8Gk0PVuLVU'
export const googleReviewsUrl = `https://search.google.com/local/reviews?placeid=${googlePlaceId}`
