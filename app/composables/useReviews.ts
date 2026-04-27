const reviewImages = import.meta.glob('~/assets/img/reviewers/*.png', {
  eager: true,
  import: 'default',
})

export default function useReviews() {
  const localReviews = ref(reviews)
  const currentReviewIndex = ref(0)
  const totalReviews = computed(() => localReviews.value.length)

  const eventProps = {
    startX: 0,
    diff: 0,
    isDragging: false,
  }

  const nextReview = () => {
    currentReviewIndex.value = (currentReviewIndex.value + 1) % localReviews.value.length
  }

  const prevReview = () => {
    currentReviewIndex.value =
      (currentReviewIndex.value - 1 + localReviews.value.length) % localReviews.value.length
  }

  const goToReview = (index: number) => {
    currentReviewIndex.value = index
  }

  const getReviewAvatarUrl = (fileName: string) => {
    if (!fileName) return ''

    const path = `/assets/img/reviewers/${fileName}`

    return reviewImages[path] || ''
  }

  const startTouch = (e: TouchEvent) => {
    eventProps.startX = e.touches[0]?.clientX ?? 0
    eventProps.diff = 0
  }
  const moveTouch = (e: TouchEvent) => {
    eventProps.diff = eventProps.startX - (e.touches[0]?.clientX ?? 0)
  }
  const endTouch = () => {
    if (Math.abs(eventProps.diff) > 40) {
      eventProps.diff > 0 ? nextReview() : prevReview()
    }
  }

  const startMouse = (e: MouseEvent) => {
    eventProps.startX = e.clientX
    eventProps.isDragging = true
    eventProps.diff = 0
  }
  const moveMouse = (e: MouseEvent) => {
    if (!eventProps.isDragging) return
    eventProps.diff = eventProps.startX - e.clientX
  }
  const endMouse = () => {
    if (!eventProps.isDragging) return
    eventProps.isDragging = false
    if (Math.abs(eventProps.diff) > 40) {
      eventProps.diff > 0 ? nextReview() : prevReview()
    }
  }

  const handlers = {
    startTouch,
    moveTouch,
    endTouch,
    startMouse,
    moveMouse,
    endMouse,
  }

  return {
    reviews: localReviews,
    getReviewAvatarUrl,
    totalReviews,
    currentReviewIndex,
    nextReview,
    prevReview,
    goToReview,
    handlers,
  }
}
