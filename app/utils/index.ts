export const reviews = [
  {
    name: 'faima siddique',
    profilePhoto: 'faima siddique.png',
    numberReviews: '4',
    numberPhotos: '0 photos',
    rating: 5,
    date: 20260318,
    text: "My son's confidence and grades in maths have improved hugely since working with Fabrice. His calm, clear teaching style makes a real difference.",
  },
  {
    name: 'Zamzam Ahmed Ismail',
    profilePhoto: 'Zamzam Ahmed Ismail.png',
    numberReviews: '6',
    numberPhotos: '0 photos',
    rating: 4,
    date: 20260312,
    text: `Fabrice has been a fantastic maths tutor for my son. He is extremely patient, clear in his explanations, and has a calm teaching style that really helps my son feel more comfortable with the subject.

    Fabrice takes the time to break concepts down step by step and makes sure the pupil truly understands before moving on. What I appreciate most is how encouraging he is, he builds confidence as well as knowledge.

    My son looks forward to his sessions and is becoming more willing to engage with maths, which is something we struggled with before. Fabrice is reliable, professional, and clearly very dedicated to helping his students succeed.

    I would highly recommend Fabrice to any parent looking for a supportive and effective maths tutor.`,
  },
  {
    name: 'Andrea Smith',
    profilePhoto: 'Andrea Smith.png',
    localGuide: true,
    numberReviews: '15',
    numberPhotos: '4 photos',
    rating: 5,
    date: 20260314,
    text: "Fabrice is a great tutor, and my son is making excellent progress as he prepares for his GCSE's. Fabrice is always on time, sets relatable homework that helps my son to remember what he's just learnt. We receive a summary of the lesson, along with the a lesson plan for the forthcoming week. My son is starting to enjoy maths again. Great tutor choice.",
  },
  {
    name: 'Sheila P. Lallmamode',
    profilePhoto: 'Sheila P. Lallmamode.png',
    numberReviews: '3',
    numberPhotos: '0 photos',
    rating: 5,
    date: 20260310,
    text: `Fabrice taught my son.

    We’ve honestly been really pleased with how Fabrice works with him. He explains things clearly, takes his time, and makes sure everything is understood without it ever feeling overwhelming. The pace feels just right, and the sessions are calm and manageable.

    What we appreciate most is how comfortable our son feels. He’s happy to ask questions, stays focused throughout, and actually remembers what they cover. Fabrice has a patient, straightforward way of breaking things down, and it really shows in how engaged and responsive our son has become.

    We are really happy with continuing the lessons with him.`,
  },
  {
    name: 'Sakinah Urbina',
    profilePhoto: 'Sakinah Urbina.png',
    numberReviews: '1',
    numberPhotos: '0 photos',
    rating: 5,
    date: 20260227,
    text: 'He was very helpful, kind and patient. Thank you!',
  },
  {
    name: 'Ammar Mallah',
    profilePhoto: 'Ammar Mallah.png',
    numberReviews: '10',
    numberPhotos: '2 photos',
    rating: 5,
    date: 20251101,
    text: 'Fabrice tutored my son in GCSE Maths, and I was highly impressed with his resourcefulness, dedication, and commitment. He effectively used a range of formative assessment strategies to identify gaps and address misunderstandings. Fabrice also demonstrated a strong understanding of learning theories, including cognitive overload theory, and applied strategies to improve information retrieval and retention. I highly recommend him as a tutor for anyone seeking academic improvement and deeper understanding in mathematics.',
  },
  {
    name: 'Zahida Nawaz',
    profilePhoto: 'Zahida Nawaz.png',
    localGuide: true,
    numberReviews: '26',
    numberPhotos: '18 photos',
    rating: 5,
    date: 20250919,
    text: "Fabrice tutored my daughter in the lead-up to her GCSE Maths exam. We were really pleased with the support he provided. He was professional, always well-prepared and communicated clearly throughout. He broke down concepts in an accessible way, adapted to her pace and really helped boost her confidence before the exam. We're very grateful for his support and would recommend him to any parent looking for reliable support. Thank you so much!",
  },
]

export function formatRelativeDate(
  input: number | string,
  locale: string = 'en'
): string {
  const str = String(input)

  const year = Number(str.slice(0, 4))
  const month = Number(str.slice(4, 6)) - 1
  const day = Number(str.slice(6, 8))

  const inputDate = new Date(year, month, day)
  const today = new Date()

  inputDate.setHours(0, 0, 0, 0)
  today.setHours(0, 0, 0, 0)

  const diffDays = Math.floor(
    (inputDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  )

  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' })

  if (Math.abs(diffDays) < 7) {
    return rtf.format(diffDays, 'day')
  }

  const diffWeeks = Math.round(diffDays / 7)
  return rtf.format(diffWeeks, 'week')
}

export function scrollTo(elId: string) {
  const element = document.getElementById(elId)
  if (element) {
    element.style.scrollMarginTop = '20px'
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

export function openWhatsAppOrCall() {
  const phone = '447530259923'
  const waUrl = `https://wa.me/${phone}`
  const callUrl = `tel:${phone}`

  const win = window.open(waUrl, '_blank')

  setTimeout(() => {
    if (!win || win.closed || typeof win.closed === 'undefined') {
      window.location.href = callUrl
    }
  }, 1000)
}

export function queryToString(
  query: Record<string, unknown>,
  key: string
): string {
  const value = query[key]

  if (typeof value === 'string') return value
  if (Array.isArray(value)) return value[0] ?? ''
  return ''
}

export function validateEmail(email: string): boolean {
  if (!email) return true
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

export function validatePhone(phone: string): boolean {
  if (!phone) return true
  const re = /^\+?\d{7,15}$/
  return re.test(phone)
}
