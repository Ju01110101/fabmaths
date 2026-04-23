<template>
  <section class="thank-you container">
    <h1>You're all set! I’ve got your details.</h1>
    <p>I'll message you soon to arrange the first session. To skip the wait, you can tap below to message me directly on WhatsApp now.
</p>
  <p>
    <button type="button" onclick="window.location.href='https://wa.me/447530259923';">
      Message me on WhatsApp now
    </button>

  </p>
  </section>
</template>

<script setup></script>

<style scoped lang="scss">
.thank-you {
  padding: 12rem 1rem 3rem;

  h1,
  h2 {
    color: $secondary;
    font-size: 21px;
    text-transform: none;
    font-weight: 700;
  }
}
</style>
