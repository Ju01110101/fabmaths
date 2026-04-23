<template>
  <div class="faq-section">
    <div class="faq-container">
      <div 
        v-for="(item, index) in faqItems" 
        :key="index" 
        class="faq-item"
        :class="{ active: activeIndex === index }"
      >
        <button 
          class="faq-question" 
          @click="toggle(index)"
          :aria-expanded="activeIndex === index"
        >
          <span class="question">{{ item.question }}</span>
          <span class="faq-icon">
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path d="M7 10l5 5 5-5z" fill="currentColor"/>
            </svg>
          </span>
        </button>

        <div 
          class="faq-answer-wrapper"
          :style="getWrapperStyle(index)"
        >
          <div class="faq-answer">
            <p>{{ item.answer }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const activeIndex = ref(null);

const faqItems = ref([
  {
    question: "How quickly will you reply?",
    // answer: "I aim to respond promptly during the day. If you message me in the evening or over the weekend, you can expect a reply by the following morning."
    answer: "I'll message you as soon as I'm available, usually within a few hours during the day."
  },
  {
    question: "Do you do phone calls?",
    // answer: "I handle all bookings via WhatsApp or text. It keeps a clear record of our schedule and is much faster for busy parents."
    // answer: "I book sessions via WhatsApp/text for speed and clarity - most parents prefer this to phone tag. If you need to speak, we can arrange a quick call."
    answer: "I arrange sessions via WhatsApp/text for speed and clarity - most parents prefer this to phone tag. If you'd like to speak first, we can arrange a quick call."
  },
  {
    question: "What exam boards do you cover?",
    answer: "AQA, Edexcel, OCR"
  },
  {
    question: "How much does it cost?",
    answer: "My sessions are £30 per hour, paid via Stripe/PayPal (or bank transfer if you prefer). No hidden fees / upfront packages."
  },
  {
    question: "How does payment work?",
    answer: "Pay-as-you-go via bank transfer. You only pay for the sessions you book."
  },
  {
    question: "My child is in Year 9 / Year 12 – can you help?",
    answer: "I am currently prioritising Year 10 & 11 students for the upcoming exam season. However, please message me and I can let you know if a spot opens up."
  }
]);

const toggle = (index) => {
  activeIndex.value = activeIndex.value === index ? null : index;
};

const getWrapperStyle = (index) => {
  return {
    gridTemplateRows: activeIndex.value === index ? '1fr' : '0fr',
    opacity: activeIndex.value === index ? '1' : '0'
  };
};
</script>

<style scoped lang="scss">
.faq-section {
  width: 100%;
  margin: 4rem 0 2rem;
  padding: 0;
}

.faq-container {
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
}

.faq-item {
  border: 1px solid #f0f0f0;
  border-radius: 12px;
  background: #fff;
  overflow: hidden;
  transition: border-color 0.3s ease;

  &.active {
    border-color: #c63d5d;
  }
}

.faq-question {
  width: 100%;
  display: flex;
  gap: 12px;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  font-weight: 600;
  color: #3c4043;
  transition: color 0.3s ease;
  -webkit-tap-highlight-color: transparent; /* Removes the grey box on click in iOS */

  &:hover {
    color: #c63d5d;
  }

  .question {
    font-size: 18px;
    flex: 1;
  }
}

.faq-icon {
  color: #c63d5d;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: center center;

  svg {
    display: block;
  }
}

.active .faq-icon {
  transform: rotate(180deg);
}

.faq-answer-wrapper {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.3s cubic-bezier(0.4, 0, 0.2, 1), 
              opacity 0.2s ease;
}

.faq-answer {
  overflow: hidden;
  
  p {
    padding: 0.2rem 0.8rem 0.8rem;
    margin: 0;
    line-height: 1.6;
    font-size: 17px;
  }
}
</style>