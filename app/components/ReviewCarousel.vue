<script setup lang="ts">
const {
  reviews,
  currentReviewIndex,
  getReviewAvatarUrl,
  nextReview,
  prevReview,
  goToReview,
  handlers,
} = useReviews()
const isReady = ref(false)
const cardRefs = ref<(HTMLElement | null)[]>([])
const viewportHeight = ref(0)
const viewportStyle = computed(() => ({
  height: viewportHeight.value ? `${viewportHeight.value}px` : 'auto',
}))
function setCardRef(
  el: Element | ComponentPublicInstance | null,
  index: number
) {
  if (el && el instanceof HTMLElement) {
    cardRefs.value[index] = el
  }
}
function updateHeight() {
  const el = cardRefs.value[currentReviewIndex.value]
  if (!el) return

  viewportHeight.value = el.offsetHeight
  if (!isReady.value) {
    isReady.value = true
  }
}

watch(currentReviewIndex, () => {
  nextTick(updateHeight)
})

onMounted(() => {
  nextTick(updateHeight)
})
</script>

<template>
  <div class="reviews-section">
    <div class="google-summary">
      <h2 class="business-name">FabMaths</h2>
      <div class="rating-row">
        <span class="rating-score">4.9</span>
        <div class="rating-stars">
          <span v-for="n in 5" :key="n" class="star-gold">★</span>
        </div>
        <span class="review-count">7 reviews</span>

        <div class="nav-arrows">
          <button
            class="nav-btn"
            @click="prevReview"
            aria-label="Previous review"
          >
            <svg viewBox="0 0 32 24" class="arrow-svg">
              <path d="M4 12h22M4 12l8-8M4 12l8 8" stroke-width="1" />
            </svg>
          </button>
          <button class="nav-btn" @click="nextReview" aria-label="Next review">
            <svg viewBox="0 0 32 24" class="arrow-svg">
              <path d="M28 12H6M28 12l-8-8M28 12l-8 8" stroke-width="1" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <div class="carousel-container">
      <div
        class="carousel-viewport"
        :class="{ ready: isReady }"
        :style="viewportStyle"
        @touchstart="handlers.startTouch"
        @touchmove="handlers.moveTouch"
        @touchend="handlers.endTouch"
        @mousedown="handlers.startMouse"
        @mousemove="handlers.moveMouse"
        @mouseup="handlers.endMouse"
        @mouseleave="handlers.endMouse"
      >
        <div
          class="carousel-track"
          :style="{ transform: `translateX(-${currentReviewIndex * 100}%)` }"
        >
          <div
            class="review-card"
            v-for="(review, index) in reviews"
            :key="index"
            :ref="(el) => setCardRef(el, index)"
          >
            <div class="card-inner">
              <div class="review-header">
                <img
                  :src="getReviewAvatarUrl(review.profilePhoto)"
                  class="review-photo"
                  @load="updateHeight"
                />
                <div class="header-text">
                  <div class="review-name">{{ review.name }}</div>
                  <div class="review-date">
                    {{ formatRelativeDate(review.date) }}
                  </div>
                </div>
              </div>

              <div class="review-stars">
                <span
                  v-for="n in 5"
                  :key="n"
                  class="star"
                  :class="{ filled: n <= review.rating }"
                  >★</span
                >
              </div>

              <p class="review-text">{{ review.text }}</p>

              <button class="google-button" @click="openGoogleReviews">
                View on Google
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="dots-container">
        <span
          v-for="(_, index) in reviews"
          :key="index"
          class="dot"
          :class="{ active: currentReviewIndex === index }"
          @click="goToReview(index)"
        ></span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.reviews-section {
  margin: 2.75rem 0 2rem;
}

.google-summary {
  max-width: 450px;
  margin: 0 auto 1.5rem;

  .business-name {
    font-size: 1.1rem;
    font-family: 'Lato', sans-serif;
    font-weight: 700;
    color: #243f63;
    margin-bottom: 0.25rem;
  }

  .rating-row {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .rating-score {
    font-size: 1.3rem;
    font-weight: 700;
    color: #243f63;
  }

  .star-gold {
    color: #fbbc04;
    font-size: 1.6rem;
  }

  .review-count {
    color: #70757a;
    font-size: 1rem;
    margin-right: auto;
  }

  .nav-arrows {
    display: flex;
    gap: 10px;
    align-items: center;
    margin-bottom: -3px;

    .nav-btn {
      background: none;
      border: none;
      padding: 0;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      -webkit-tap-highlight-color: transparent;
      position: relative;
      top: 1px;

      .arrow-svg {
        width: 26px;
        height: 24px;
        fill: none;
        stroke: #878c92;
      }
    }
  }
}

.carousel-container {
  max-width: 450px;
  margin: 0 auto;
}

.carousel-viewport {
  width: 100%;
  overflow: hidden;
  touch-action: pan-y;
  border-radius: 16px;
  border: 1px solid #f0f0f0;
  background: #fff;
  isolation: isolate;
  -webkit-mask-image: -webkit-radial-gradient(white, black);
  position: relative;
  opacity: 0;
  transition:
    height 0.25s ease,
    opacity 0.2s ease;
}

.carousel-viewport.ready {
  opacity: 1;
}

.carousel-track {
  display: flex;
  align-items: flex-start;
  transition: transform 0.25s cubic-bezier(0, 0, 0.2, 1);
}

.review-card {
  flex: 0 0 100%;
  width: 100%;
}

.card-inner {
  padding: 1.5rem;
}

.review-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 1rem;
}
.review-photo {
  width: 45px;
  height: 45px;
  object-fit: cover;
}
.review-name {
  font-weight: 700;
  font-size: 18px;
  color: #333;
}
.review-date {
  font-size: 16px;
  color: #70757a;
}
.review-stars {
  margin-bottom: 0.8rem;
  display: flex;
  gap: 2px;
}

.star {
  font-size: 1.25rem;
  color: #e0e0e0;
}
.star.filled {
  color: #fbbc04;
}

.review-text {
  font-size: 17px;
  line-height: 1.6;
  color: #3c4043;
  margin-bottom: 1.5rem;
}

.google-button {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #dadce0;
  border-radius: 8px;
  background: white;
  font-size: 16px;
  font-weight: 600;
  color: #1a73e8;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}

.dots-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 13px;
  padding: 1.5rem 0;
}

.dot {
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background: #b8c1ce;
  transition: all 0.2s ease;
  cursor: pointer;
}

.dot.active {
  width: 13px;
  height: 13px;
  background: #c63d5d;
  transform: scale(1.2);
}
</style>
