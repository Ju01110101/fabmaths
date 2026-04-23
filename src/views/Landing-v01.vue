<template>
  <section class="landing-page container">
    <div class="form-wrapper">
      <div class="landing-logo" to="/">
        <img class="header-logo" src="@/assets/img/logo.svg">
      </div>

      <h1>
        GCSE Maths exams are weeks away. If your child is struggling, now is the time to fix it.
      </h1>
      
      <p class="intro">
        1-to-1 support focused on identifying and fixing gaps quickly.
      </p>

      <!-- -->

      <div class="about-picture">
        <img class="wide" src="@/assets/img/landing-about-picture.jpg">
      </div>

      <div class="bio">
        <p>
          I'm Fabrice, a GCSE Maths specialist in Birmingham. I work with Year 10 and 11 students who've fallen behind — finding the exact gaps (usually from Year 8-9) and fixing them before exam season. Sessions are 1-to-1 via Zoom, tailored to your child's pace.
        </p>
      </div>

      <!-- -->

      <ReviewCarousel />

      <!-- -->

      <div class="cta-section">
        <button @click="scrollToForm">
          Book Your First Session
        </button>
      </div>

      <!-- -->

      <form id="contact-form" @submit.prevent="handleSubmit" class="form contact-form">
        <input type="hidden" name="anti_bot" v-model="form.anti_bot" />

        <div class="intro-form">
          <h2>What happens next</h2>

          <p class="intro-form-title">After you submit :</p>

          <ul>
            <li>I'll message you within a few hours.</li>
            <li>We'll briefly discuss your child's needs.</li>
            <li>If I can help, I'll send my availability and we'll book a first session. First session includes a quick diagnostic.</li>
            <li>If I can't help, I'll point you in the right direction.</li>
          </ul>
        </div>

        <p class="form-info emphasis2">
          * Indicates required question
        </p>

        <!-- <div class="form-group form-group-who">
          <label class="radio-label">
            Who is filling out this form? <span class="mandatory">*</span>
          </label>

          <div class="radio-group clean-radio">
            <label class="radio-option">
              <input type="radio" name="role" value="Parent" v-model="form.role" required />
              <span>Parent / Guardian</span>
            </label>

            <label class="radio-option">
              <input type="radio" name="role" value="Student" v-model="form.role" required />
              <span>Student</span>
            </label>
          </div>
        </div> -->

        <div class="form-group">
          <label for="name">Parent or Guardian Name <span class="mandatory">*</span></label>
          <input
            id="name"
            v-model="form.name"
            type="text"
            required
            placeholder="Jane Smith"
          />
        </div>

        <div class="form-group">
          <label for="message">
            What's their current grade or biggest struggle?
            <span class="label-meta">(optional)</span>
          </label>

          <textarea
            id="message"
            v-model="form.message"
            placeholder="e.g. Grade 4, struggling with algebra..."
            rows="5"
          ></textarea>
        </div>

        <!--
        <div class="form-group">
          <label for="phone">Phone Number (optional)</label>
          <input id="phone" v-model="form.phone" type="tel" placeholder="+44..." />
        </div>
        -->

        <!-- <div class="form-group form-group-email">
          <label for="email">Email Address <span class="mandatory">*</span></label>
          <input id="email" v-model="form.email" type="email" placeholder="jane.smith@gmail.com" />
        </div> -->

        <div class="form-group form-group-phone">
          <label for="contact">WhatsApp / Phone Number <span class="mandatory">*</span></label>
          <!-- <label for="contact">WhatsApp / Phone Number
            <span class="label-meta">(optional)</span>
          </label> -->
          <span class="caption">I'll text you to arrange the first session.</span>
          <!-- <input
            id="contact"
            v-model="form.contact"
            type="tel"
            required
            placeholder="07700 900000 (for WhatsApp only)"
          /> -->
          <input
            id="contact"
            v-model="form.contact"
            type="tel"
            required
            placeholder="07700 900000"
          />
          <p v-if="error" class="error">{{ error }}</p>
        </div>

        <button type="submit" :disabled="loading">
          {{ loading ? 'Sending...' : "Book Your First Session" }}          
        </button>

        <p v-if="error" class="error">{{ error }}</p>
      </form>

      <!-- -->

      <!-- <ReviewCarousel /> -->

      <!-- -->

      <FaqAccordion />

      <div class="cta-section">
        <button @click="scrollToForm">
          Get Started Now
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import ReviewCarousel from '@/components/ReviewCarousel.vue';
import FaqAccordion from '@/components/FaqAccordion.vue';

const router = useRouter()
const loading = ref(false)
const error = ref(null)
const form = ref({
  role: '',
  name: '',
  email: '',
  // phone: '',
  contact: '',
  message: '',
  anti_bot: ''
})

function scrollToForm() {
  const target = document.getElementById('contact-form');
  if (!target) return;

  // iPhone + FB/IG in-app browser layout nudge
  target.style.scrollMarginTop = '20px';

  const start = window.pageYOffset;
  const rect = target.getBoundingClientRect();
  const end = rect.top + window.pageYOffset - 20;

  // Faster overall
  const duration = 420; // was 550

  const startTime = performance.now();

  // Slow → fast → smooth stop
  function easeInOutCubic(t) {
    return t < 0.5
      ? 4 * t * t * t        // slow → fast
      : 1 - Math.pow(-2 * t + 2, 3) / 2; // fast → smooth stop
  }

  function animate(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeInOutCubic(progress);

    window.scrollTo(0, start + (end - start) * eased);

    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  }

  requestAnimationFrame(animate);
}



async function handleSubmit() {
  if (form.value.anti_bot) return // honeypot check

  // detect whether contact is valid (email or phone)
  // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const phoneRegex = /^\+?\d{7,15}$/;

  if (!phoneRegex.test(form.value.contact)) {
    error.value = 'Please enter a valid phone number.'
    return
  }

  loading.value = true
  error.value = null

  try {
    const response = await fetch('/contact.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form.value)
    })
    const result = await response.json()

    if (result.success) {
      router.push('/thank-you')
    } else {
      throw new Error('Message failed to send.')
    }
  } catch (err) {
    error.value = 'Something went wrong. Please try again later.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped lang="scss">
$caption: #8897ab;
$black: #243f63;

:global(body) {
  background-color: rgb(233, 236, 239) !important;
}

.landing-page {
  margin: 0 auto;
  padding: 1rem 1.5rem 0;

  .bio {
    margin: 2rem 0 0;

    p {
      margin: 0;
    }
  }

  .form-wrapper {
    .landing-logo {
      text-align: center;
      margin-bottom: 25px;

      img {
        max-width: 155px;

        @include media_600 {
          max-width: 130px;
        }
      }
    }

    h1,
    h2 {
      margin: 0;
      color: $secondary;
      font-size: 21px;
      text-transform: none;
      font-weight: 700;
    }

    h2 {
      margin: 0 0 1.25rem;
      color: $black;
      font-size: 16px;
      text-transform: none;
      font-weight: 700;
      padding: 0;
    }

    .intro {
      margin: 13px 0 25px;

      span {
        color: #8897ab;
      }
    }

    li,
    p,
    p span {
      font-size: 17px;
    }

    .intro-form {
      padding-top: 1rem;
      margin-bottom: 1.5rem;

      p {
        margin: 0;
      }

      ul,
      li {
        list-style: disc;
      }

      ul {
        margin: 0.5em 0;
        padding-left: 1.2rem;
        list-style-position: inside;
      }

      li {
        // padding: 0;
        margin-bottom: 0.5em;
      }

      h2 {
        font-size: 19px;
      }
    }

    .form-info {
      font-size: 16px;
    }

    .contact-form {
      max-width: 600px;
      margin: 2em auto 0;

      // @include media_600 {
      //   margin-top: 0;
      // }

      .clean-radio {
        @include media_600 {
        }
      }

      .form-group-who {
      }

      .form-group-phone {
      }

      label {
        @include media_600 {
        }
      }

      span {
        font-weight: normal;
      }
    }
  }
}

.about-picture {
  margin: 2rem 0 0;

  .wide {
    margin: 0 -2rem;
    width: calc(100% + 4rem);
    display: block;
  }
}

.cta-section {
  margin: 2rem 0;
}
</style>
