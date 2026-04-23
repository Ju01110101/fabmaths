<template>
  <div class="loading-page">
    <div class="loading-icon"></div>
  </div>
</template>

<style lang="scss" scoped>
.loading-page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 1000;
  padding: 1rem;
  font-size: 3rem;
  font-family: sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: fadeIn ease 1.25s;

  .loading-icon {
    position: relative;
    top: 235px;
    display: inline-block;
    width: 3.5rem;
    height: 3.5rem;
    border: 5px solid $red;
    border-radius: 50%;
    border-top-color: $brown;
    animation: spin 1s ease-in-out infinite;

    @include media_600 {
      top: 205px;
    }
  }
}

@keyframes spin {
  to {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
</style>
