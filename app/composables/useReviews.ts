const reviewImages = import.meta.glob('~/assets/img/reviewers/*.png', {
  eager: true,
  import: 'default',
})

export default function useReviews() {
  const localReviews = ref(reviews)
  const currentReviewIndex = ref(0)
  const totalReviews = computed(() => localReviews.value.length)

  const nextReview = () => {
    currentReviewIndex.value =
      (currentReviewIndex.value + 1) % localReviews.value.length
  }

  const prevReview = () => {
    currentReviewIndex.value =
      (currentReviewIndex.value - 1 + localReviews.value.length) %
      localReviews.value.length
  }

  const goToReview = (index: number) => {
    currentReviewIndex.value = index
  }

  const getReviewAvatarUrl = (fileName: string) => {
    if (!fileName) return ''

    const path = `/assets/img/reviewers/${fileName}`

    return reviewImages[path] || ''
  }

  return {
    reviews: localReviews,
    getReviewAvatarUrl,
    totalReviews,
    currentReviewIndex,
    nextReview,
    prevReview,
    goToReview,
  }
}
