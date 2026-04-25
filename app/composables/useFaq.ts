export default function useFaq() {
  const faqItems = computed(() => [
    {
      question: 'How quickly will you reply?',
      answer:
        "I'll message you as soon as I'm available, usually within a few hours during the day.",
    },
    {
      question: 'Do you do phone calls?',
      answer:
        "I arrange sessions via WhatsApp/text for speed and clarity - most parents prefer this to phone tag. If you'd like to speak first, we can arrange a quick call.",
    },
    {
      question: 'What exam boards do you cover?',
      answer: 'AQA, Edexcel, OCR',
    },
    {
      question: 'How much does it cost?',
      answer:
        'My sessions are £30 per hour, paid via Stripe/PayPal (or bank transfer if you prefer). No hidden fees / upfront packages.',
    },
    {
      question: 'How does payment work?',
      answer:
        'Pay-as-you-go via bank transfer. You only pay for the sessions you book.',
    },
    {
      question: 'My child is in Year 9 / Year 12 – can you help?',
      answer:
        'I am currently prioritising Year 10 & 11 students for the upcoming exam season. However, please message me and I can let you know if a spot opens up.',
    },
  ])
  const activeIndex = ref<number | null>(null)

  const toggle = (index: number) => {
    activeIndex.value = activeIndex.value === index ? null : index
  }

  return { faqItems, activeIndex, toggle }
}
