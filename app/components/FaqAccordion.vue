<script setup>
const { faqItems, activeIndex, toggle } = useFaq()
const getWrapperStyle = (index) => {
  return {
    gridTemplateRows: activeIndex.value === index ? '1fr' : '0fr',
    opacity: activeIndex.value === index ? '1' : '0',
  }
}
</script>

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
              <path d="M7 10l5 5 5-5z" fill="currentColor" />
            </svg>
          </span>
        </button>

        <div class="faq-answer-wrapper" :style="getWrapperStyle(index)">
          <div class="faq-answer">
            <p>{{ item.answer }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

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
  transition:
    grid-template-rows 0.3s cubic-bezier(0.4, 0, 0.2, 1),
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
