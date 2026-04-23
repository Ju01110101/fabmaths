<template>
  <section class="contact container">
    <div class="form-wrapper">
      <!-- <h1>Get Your Child Ready for Their GCSE Exams!</h1> -->
      <h1>Prepare Your Child for GCSE Success!</h1>
      
      <p class="intro">
        Book a FREE <span>(£25 value)</span> first lesson below - see how your child enjoys it, no obligation.
      </p>

      <form @submit.prevent="handleSubmit" class="form contact-form">
        <input type="hidden" name="anti_bot" v-model="form.anti_bot" />

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

        <!-- <div class="form-group">
          <label for="email">Email Address *</label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            required
            placeholder="example@email.com"
          />
        </div>

        <div class="form-group">
          <label for="phone">Phone Number (optional)</label>
          <input id="phone" v-model="form.phone" type="tel" placeholder="+44..." />
        </div> -->

        <div class="form-group">
          <label for="contact">Enter your email or phone number <span class="mandatory">*</span></label>
          <input
            id="contact"
            v-model="form.contact"
            type="text"
            required
            placeholder="you@example.com or +447123456789"
            @blur="detectContactType"
          />
          <p v-if="error" class="error">{{ error }}</p>
        </div>


        <div class="form-group">
          <label for="message">Tell me a bit about your child’s needs <span>(optional)</span></label>
          <textarea
            id="message"
            v-model="form.message"
            placeholder="e.g. struggles with algebra, prefers weekend sessions…"
            rows="5"
          ></textarea>
        </div>

        <button type="submit" :disabled="loading">
          {{ loading ? 'Sending...' : 'Claim Your Free Session' }}
        </button>

        <p v-if="error" class="error">{{ error }}</p>
      </form>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const loading = ref(false)
const error = ref(null)
const form = ref({
  name: '',
  // email: '',
  // phone: '',
  contact: '',
  message: '',
  anti_bot: ''
})

function detectContactType() {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\+?\d{7,15}$/;

  if (emailRegex.test(form.value.contact)) {
    error.value = '';
    return 'email';
  } else if (phoneRegex.test(form.value.contact)) {
    error.value = '';
    return 'phone';
  } else {
    error.value = 'Please enter a valid email or phone number.';
    return null;
  }
}

async function handleSubmit() {
  if (form.value.anti_bot) return // honeypot check

  // detect whether contact is valid (email or phone)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\+?\d{7,15}$/;

  if (emailRegex.test(form.value.contact)) {
    form.value.contactType = 'email'
  } else if (phoneRegex.test(form.value.contact)) {
    form.value.contactType = 'phone'
  } else {
    error.value = 'Please enter a valid email address or phone number.'
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

// async function handleSubmit() {
//   const contactType = detectContactType()
//   if (!contactType) return

//   if (form.value.anti_bot) return // honeypot check
//   loading.value = true
//   error.value = null

//   try {
//     const response = await fetch('/contact.php', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(form.value)
//     })
//     const result = await response.json()

//     if (result.success) {
//       router.push('/thank-you')
//     } else {
//       throw new Error('Message failed to send.')
//     }
//   } catch (err) {
//     error.value = 'Something went wrong. Please try again later.'
//   } finally {
//     loading.value = false
//   }
// }
</script>

<style scoped lang="scss">
.contact {
  // max-width: 700px;
  // max-width: 600px;
  margin: 0 auto;
  padding: 2rem 1rem;

  .form-wrapper {
    padding: 0 1rem;

    h1 {
      text-align: center;
      margin-bottom: 1rem;
      color: $secondary;
    }

    .intro {
      font-size: 17px;
      text-align: center;
      margin-bottom: 2rem;

      span {
        // filter: brightness(1.75);
        color: #8897ab;
      }
    }

    .contact-form {
      max-width: 600px;
      margin: 2em auto 0;

      span {
        color: #8897ab;
        font-weight: normal;
      }
    }
  }
}
</style>
