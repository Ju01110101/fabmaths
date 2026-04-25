<script setup lang="ts">
const { t } = useI18n()
const { isMobile } = useDevice()

definePageMeta({
  bodyClass: 'home',
})
</script>

<template>
  <div class="wrap home-wrap">
    <div class="container container-home">
      <div class="home-header">
        <h1 class="home-title" v-html="t('home-title')"></h1>

        <a class="zoom" target="_blank" href="https://www.zoom.com/">
          <img src="@/assets/img/zoom.svg" />
        </a>
      </div>

      <div class="text-image content">
        <div class="col1">
          <div class="intro">
            <p v-html="t('home-paragraph-1')"></p>
          </div>

          <div class="offer">
            <p v-html="t('home-paragraph-2')"></p>
          </div>

          <div class="contact">
            <p v-html="t('home-paragraph-3')"></p>
            <!-- <a class='tel emphasis1' href='tel:07530259923'>07530 259 923</a> -->
            <a class="tel emphasis1" @click.prevent="openWhatsAppOrCall"
              >07530 259 923</a
            >
            <br />
            <a class="email" href="mailto:fabrice@fab-maths.com"
              >fabrice<span>@</span>fab-maths.com</a
            >
          </div>

          <div class="social-media">
            <div class="icons">
              <a
                href="https://www.instagram.com/fabmathstutor/"
                target="_blank"
                aria-label="Instagram"
                class="instagram"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-instagram"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"
                  />
                </svg>
              </a>

              <!--               <a href="https://www.tiktok.com/@fabmaths" target="_blank" aria-label="TikTok">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-tiktok" viewBox="0 0 16 16">
                  <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3z"/>
                </svg>
              </a> -->

              <a
                href="https://www.facebook.com/fabmathstutor"
                target="_blank"
                aria-label="Facebook"
                class="facebook"
              >
                <!--          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-facebook" viewBox="0 0 16 16">
                  <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951"/>
                </svg> -->
                <svg
                  fill="currentColor"
                  height="16px"
                  width="16px"
                  version="1.1"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  viewBox="-337 273 123.5 256"
                  xml:space="preserve"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <path
                      d="M-260.9,327.8c0-10.3,9.2-14,19.5-14c10.3,0,21.3,3.2,21.3,3.2l6.6-39.2c0,0-14-4.8-47.4-4.8c-20.5,0-32.4,7.8-41.1,19.3 c-8.2,10.9-8.5,28.4-8.5,39.7v25.7H-337V396h26.5v133h49.6V396h39.3l2.9-38.3h-42.2V327.8z"
                    ></path>
                  </g>
                </svg>
              </a>

              <a
                href="https://linktr.ee/fabmaths"
                target="_blank"
                aria-label="Linktree"
                class="linktr"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  shape-rendering="geometricPrecision"
                  text-rendering="geometricPrecision"
                  image-rendering="optimizeQuality"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  viewBox="0 0 417 512.238"
                >
                  <path
                    fill="currentColor"
                    fill-rule="nonzero"
                    d="M171.274 344.942h74.09v167.296h-74.09V344.942zM0 173.468h126.068l-89.622-85.44 49.591-50.985 85.439 87.829V0h74.086v124.872L331 37.243l49.552 50.785-89.58 85.24H417v70.502H290.252l90.183 87.629L331 381.192 208.519 258.11 86.037 381.192l-49.591-49.591 90.218-87.631H0v-70.502z"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div class="col2">
          <img v-if="isMobile" src="@/assets/img/fabrice.jpg" />
          <img v-else src="@/assets/img/fabrice.png" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.home-wrap {
  padding-top: 42px;

  @include media_1000 {
    padding-top: 30px;
  }

  .home-header {
    margin-bottom: 100px;

    @include media_600 {
      margin-bottom: 40px;
    }

    .home-title {
      margin: 0;
      text-align: center;

      @include media_600 {
        margin-bottom: 20px;
        font-weight: 900;

        span {
          font-weight: 900;
        }
      }

      img {
        width: 100%;
      }
    }

    .home-title,
    .home-title span {
      font-size: 95px;

      @include media_1300 {
        font-size: 80px;
      }

      @include media_1100 {
        font-size: 50px;
      }

      @include media_1000 {
        font-size: 40px;
      }

      @include media_600 {
        font-size: 25.5px;
      }
    }

    .zoom {
      img {
        display: block;
        width: 60px;
        margin: 25px auto 0;

        @include media_1100 {
          width: 50px;
          margin-top: 20px;
        }

        @include media_1000 {
          width: 40px;
        }

        @include media_600 {
          width: 35px;
          margin-top: 15px;
        }
      }
    }
  }

  .text-image {
    display: flex;
    align-items: flex-start;

    @include media_1000 {
      flex-direction: column;
    }

    .col1 {
      padding: 0 80px 0 30px;

      @include media_1200 {
        right: 50px 0 0 0;
      }

      @include media_600 {
        padding: 0;
      }

      a,
      span,
      p {
        // @include bigger_text;

        font-size: 24px;
        line-height: 1.45;

        @include media_1000 {
          font-size: 20px;
          line-height: 1.45;
        }
      }

      .intro,
      .offer,
      .contact {
        padding-left: 43px;
        background-size: 20px auto;
        background-repeat: no-repeat;

        @include media_600 {
          padding-left: 35px;
        }
      }

      .intro {
        background-image: url('@/assets/img/divide.svg');
        background-position: 5px 9px;

        @include media_600 {
          background-size: 18px auto;
          background-position: 3px 5px;
        }

        a {
          font-weight: 900;
        }
      }

      .offer {
        background-image: url('@/assets/img/equal.svg');
        background-position: 5px 12px;

        @include media_600 {
          background-size: 18px auto;
          background-position: 3px 9px;
        }
      }

      .contact {
        background-image: url('@/assets/img/wa.svg');
        background-size: 26px auto;
        background-position: 0 9px;

        @include media_600 {
          background-size: 24px auto;
          background-position: 0 6px;
        }

        p {
          margin: 0;
        }

        a {
          font-weight: 900;

          span {
            font-size: 0.8em;
          }
        }
      }

      .social-media {
        position: absolute;
        bottom: 40px;
        padding-left: 43px;

        @include media_1000 {
          position: static;
          // padding-left: 35px;
          padding-left: 0;
          margin: 40px 0 20px;
        }

        .icons {
          display: flex;
          gap: 25px;
          align-items: center;

          @include media_1000 {
            justify-content: center;
          }
        }

        .icons a {
          display: flex;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          border: none;
          width: 45px;
          height: 45px;
          border-radius: 50%;
          background: #c63d5d;

          &.instagram {
            display: none;
          }

          @include media_1000 {
            background: #243f63;
            width: 35px;
            height: 35px;
          }

          &:hover {
            filter: brightness(1.2);

            @include media_1000 {
              filter: brightness(1);
            }
          }
        }

        .icons svg {
          width: 22px;
          height: 22px;
          fill: #fff;

          path {
            fill: #fff;
          }
        }
      }
    }

    .col2 {
      min-height: 560px;

      @include media_1000 {
        min-height: 0;
        width: 100%;
      }

      img {
        margin: -140px -5px -15px 0;
        display: block;

        @include media_1100 {
          margin: 3em auto -15px;
          transform: translateX(-14px);
        }

        @include media_600 {
          margin-top: 1em;
          max-width: 320px;
        }
      }
    }
  }
}

.tel {
  cursor: pointer;
}

// .v-spinner {
//   line-height: 53px;

//   &:deep(.v-pulse) {
//     margin-left: 6px !important;
//     margin-right: 6px !important;
//   }
// }

// .slide-enter-active {
//   transition-duration: 0.3s;
//   transition-timing-function: ease-in;
// }

// .slide-leave-active {
//   transition-duration: 0.3s;
//   transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
// }

// .slide-leave-from,
// .slide-enter-to {
//   max-height: 800px;
//   overflow: hidden;
// }

// .slide-enter-from,
// .slide-leave-to {
//   overflow: hidden;
//   max-height: 0;
//   opacity: 0;
// }
</style>
