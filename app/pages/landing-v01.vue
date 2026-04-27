<script setup lang="ts">
const route = useRoute()

definePageMeta({
  layout: 'simple',
  bodyClass: 'landing',
})

const loading = ref(false)

const formRef = ref<HTMLFormElement | null>(null)
const form = ref({
  // role: queryToString(route.query, 'role'),
  name: queryToString(route.query, 'name'),
  email: queryToString(route.query, 'email'),
  // phone: queryToString(route.query, 'phone'),
  // contact: queryToString(route.query, 'contact'),
  message: queryToString(route.query, 'message'),
})

const updateFormAndError = () => {
  form.value = {
    // role: queryToString(route.query, 'role'),
    name: queryToString(route.query, 'name'),
    email: queryToString(route.query, 'email'),
    // phone: queryToString(route.query, 'phone'),
    // contact: queryToString(route.query, 'contact'),
    message: queryToString(route.query, 'message'),
  }

  if (route.query.error) {
    error.value = 'Something went wrong. Please check your data and try again.'
  }
}

const csrf = ref<string | null>(null)
const error = ref<string | null>('')

const validate = () => {
  // if (!form.role ||!form.value.name || !form.value.email || !form.value.contact) {
  //   error.value = 'Please fill in all required fields.'
  //   return false
  // }

  if (!form.value.name || !form.value.email) {
    error.value = 'Please fill in all required fields.'
    return false
  }

  if (!validateEmail(form.value.email)) {
    error.value = 'Please enter a valid email address.'
    return false
  }

  // if (!validatePhone(form.value.contact)) {
  //   error.value = 'Please enter a valid phone number.'
  //   return false
  // }

  return true
}

const handleSubmit = () => {
  if (!formRef.value || !validate()) return
  loading.value = true
  formRef.value.submit()
}

async function fetchCsrf(retries = 2) {
  try {
    error.value = ''

    const res = await fetch('/contact.php', {
      credentials: 'include',
    })

    if (!res.ok) throw new Error('Server error')

    const token = await res.text()

    if (token.length === 64) {
      csrf.value = token
    } else {
      throw new Error('Invalid CSRF token')
    }

    csrf.value = token
  } catch (err) {
    console.error(err)

    if (retries > 0) {
      setTimeout(() => fetchCsrf(retries - 1), 1000)
    } else {
      error.value = 'Failed to load the form. Please refresh the page or try again later.'
    }
  }
}

watch(
  () => route.query,
  () => {
    updateFormAndError()
  },
  { immediate: true },
)

onMounted(() => {
  // Fetch initial CSRF token for the session
  fetchCsrf()

  /**
   * Handle the Back-Forward Cache (BFCache).
   * If the user returns via the back button, we force a refresh
   * to ensure security tokens are valid and the form is cleared.
   */
  window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
      // Use replace to clean the URL and reload the page state
      // This prevents the 'error' params from staying in the browser history
      window.location.replace(window.location.origin + window.location.pathname)
    }
  })

  // Manual URL cleanup for the initial direct load if parameters exist
  const url = new URL(window.location.href)
  if (url.search) {
    // Clean URL without adding a new entry to the history stack
    window.history.replaceState({}, '', window.location.pathname)
  }
})
</script>

<template>
  <section class="landing-page container">
    <div class="form-wrapper">
      <div class="landing-logo" to="/">
        <img class="header-logo" src="@/assets/img/logo.svg" />
      </div>

      <h1>
        GCSE Maths exams are weeks away. If your child is struggling, now is the time to fix it.
      </h1>

      <p class="intro">1-to-1 support focused on identifying and fixing gaps quickly.</p>

      <div class="about-picture">
        <img class="wide" src="@/assets/img/landing-about-picture.jpg" />
      </div>

      <div class="bio">
        <p>
          I'm Fabrice, a GCSE Maths specialist in Birmingham. I work with Year 10 and 11 students
          who've fallen behind — finding the exact gaps (usually from Year 8-9) and fixing them
          before exam season. Sessions are 1-to-1 via Zoom, tailored to your child's pace.
        </p>
      </div>

      <!-- -->

      <ReviewCarousel />

      <div class="cta-section">
        <button @click="scrollTo('contact-form')">Book Your First Session</button>
      </div>

      <form
        ref="formRef"
        action="/contact.php"
        id="contact-form"
        method="POST"
        class="form contact-form"
        @submit.prevent="handleSubmit"
      >
        <input type="hidden" name="csrf" v-model="csrf" />
        <div style="display: none" aria-hidden="true">
          <input type="text" name="full_name_confirm" tabindex="-1" value="" />
        </div>

        <div class="intro-form">
          <h2>What happens next</h2>

          <p class="intro-form-title">After you submit :</p>

          <ul>
            <li>I'll message you within a few hours.</li>
            <li>We'll briefly discuss your child's needs.</li>
            <li>
              If I can help, I'll send my availability and we'll book a first session. First session
              includes a quick diagnostic.
            </li>
            <li>If I can't help, I'll point you in the right direction.</li>
          </ul>
        </div>

        <p class="form-info emphasis2">* Indicates required question</p>

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
          <label for="name"> Parent or Guardian Name <span class="mandatory">*</span> </label>
          <input
            v-model="form.name"
            id="name"
            name="name"
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
            v-model="form.message"
            id="message"
            name="message"
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

        <div class="form-group form-group-email">
          <label for="email"> Email Address <span class="mandatory">*</span> </label>
          <input
            v-model="form.email"
            id="email"
            name="email"
            type="email"
            required
            placeholder="jane.smith@gmail.com"
          />
        </div>

        <!-- <div class="form-group form-group-phone">
          <label for="contact">
            WhatsApp / Phone Number <span class="mandatory">*</span>
          </label>
          <span class="caption"
            >I'll text you to arrange the first session.</span
          >
          <input

            id="contact"
            name="contact"
            type="tel"
            required
            placeholder="07700 900000"
          />
          <p v-if="error" class="error">{{ error }}</p>
        </div> -->

        <button type="submit" :disabled="!csrf">
          {{ loading ? 'Sending...' : 'Book Your First Session' }}
        </button>

        <p v-if="error" class="error">{{ error }}</p>
      </form>

      <FaqAccordion />

      <div class="cta-section">
        <button @click="scrollTo('contact-form')">Get Started Now</button>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
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
