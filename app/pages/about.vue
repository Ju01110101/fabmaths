<script setup lang="ts">
const { t } = useI18n()

definePageMeta({
  bodyClass: 'about',
})

const featuredImage = ref(false)
setTimeout(() => {
  featuredImage.value = true
}, 50)
</script>

<template>
  <div class="wrap">
    <div class="container content content-about">
      <h1 class="page-title" v-html="t('about-title')"></h1>

      <div class="content">
        <div class="about-picture">
          <Transition name="fade">
            <img
              class="wide"
              v-show="featuredImage"
              src="@/assets/img/about-picture.jpg"
            />
          </Transition>
          <div class="caption" v-html="t('about-picture-caption')"></div>
        </div>

        <div class="section bio">
          <h2 v-html="t('about-bio-title')"></h2>
          <p v-html="t('about-bio-text')"></p>
        </div>

        <div class="section">
          <h2 v-html="t('about-experience-title')"></h2>
          <p v-html="t('about-experience-text')"></p>
        </div>

        <div class="section">
          <h2
            class="testimonial-content"
            v-html="t('about-testimonials-title')"
          ></h2>
          <p v-html="t('about-testimonials-intro')"></p>

          <div class="testimonials">
            <div class="testimonial">
              <p
                class="testimonial-content"
                v-html="t('about-testimonials-entry-1')"
              ></p>
              <p
                class="testimonial-author"
                v-html="t('about-testimonials-author-1')"
              ></p>
            </div>

            <div class="testimonial">
              <p
                class="testimonial-content"
                v-html="t('about-testimonials-entry-2')"
              ></p>
              <p
                class="testimonial-author"
                v-html="t('about-testimonials-author-2')"
              ></p>
            </div>
          </div>
        </div>

        <div class="section availability-contact">
          <h2 v-html="t('about-contact-title')"></h2>

          <p v-html="t('about-contact-text')"></p>

          <div class="contact-links">
            <span v-html="t('about-contact-links')"></span>

            <br /><br />

            <div class="email-wrapper">
              <!-- <img src="@/assets/img/email.svg"> -->
              <!-- <a class='email' href='mailto:contact@fabricepallaud.com'>contact<span>@</span>fabricepallaud.com</a> -->
              <a class="email" href="mailto:fabrice@fab-maths.com"
                >fabrice<span>@</span>fab-maths.com</a
              >
            </div>

            <div class="tel-wrapper">
              <!-- <img src="@/assets/img/contact-wa.svg"> -->
              <!-- <a class='tel' href='tel:07530259923'>07530 259 923</a> -->
              <a class="tel" @click.prevent="openWhatsAppOrCall"
                >07530 259 923</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
//
//
//
//
//
//
//
//
// $pink: #bf206f;
// $secondary: #ed474a;
// $secondary: #4180a4;
// $secondary: #296e95;
// $secondary: #2d77a2;
$secondary: #c63d5d;

$headland: 'Headland One', serif;
//
//
//
//
//
//
//
//

.content-about {
  margin-bottom: 80px;
  max-width: $content_width_small;

  h1 {
    text-align: center;
  }

  .about-picture {
    margin-bottom: 20px;
    min-height: 484px;

    @include media_1000 {
      min-height: 0;
      margin-bottom: 30px;
    }

    // img {
    //   width: 100%;
    // }

    .caption {
      margin-top: 4px;
      font-size: 0.7em;

      span {
        font-size: 1.5em;
        filter: brightness(1.25);
      }
    }
  }

  .bio {
    h2 {
      margin-top: 0;
    }
  }

  .testimonial {
    margin-bottom: 2.5em;
    padding-left: 50px;
    position: relative;

    &:before {
      position: absolute;
      content: '“';
      font-size: 70px;
      line-height: 1;
      font-family: $headland;
      top: 10px;
      left: -15px;

      @include media_600 {
        font-size: 65px;
        margin-bottom: 2em;
      }
    }

    @include media_1000 {
      margin-bottom: 3em;
      background-size: 23px auto;
      padding-left: 36px;
    }

    .testimonial-content {
      margin-bottom: 0.75em;

      @include media_1000 {
        margin-bottom: 1em;
      }
    }

    .testimonial-author {
      margin: 0;
      @include lato;
      font-size: 16px;
      font-style: italic;

      @include media_1000 {
        font-size: 16px;
        line-height: 1.4;
      }
    }
  }

  .availability-contact {
    div {
      text-align: center;
      margin-bottom: 3px;

      @include media_1000 {
        text-align: left;
      }
    }

    a {
      // color: $pink;
      color: $secondary;

      &.tel {
        // font-weight: 900;
        margin-top: 3px;
      }

      &.email {
        span {
          // color: $pink;
          color: $secondary;
          font-size: 0.9em;
          margin: 0 1px;
        }
      }

      &.tel,
      &.email {
        font-weight: 700;
      }
    }

    // .email-wrapper,
    // .tel-wrapper {
    //   display: flex;
    //   align-items: center;
    //   justify-content: center;

    //   img {
    //     margin-right: 5px;
    //   }
    // }

    // .email-wrapper {
    //   img {
    //     position: relative;
    //     top: 2px;
    //   }
    // }

    // .tel-wrapper {
    //   img {
    //     position: relative;
    //     top: 2px;
    //   }
    // }
  }
}

.tel {
  cursor: pointer;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.75s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
