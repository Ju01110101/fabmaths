<template>
  <div class="cookie-notice">
    <div class="notice-text">
      <span>
        This site uses cookies to analyze traffic. To learn more about these cookies,
        see the <router-link to="/cookie-policy" class="underline">cookie policy</router-link>.
      </span>
    </div>
    <div
      @click="closeNotice"
      class="button-notice-close button-close"
      aria-label="button-close"
    >
      <span />
    </div>
  </div>
</template>

<script setup>
import Cookies from 'js-cookie'
import { useMainStore } from '@/stores/mainStore'
const store = useMainStore()

function closeNotice() {
  Cookies.set('cookie_notice_dismissed', true, { expires: 365 })
  store.showCookieNotice = false
}
</script>

<style lang="scss">
.cookie-notice {
  line-height: 1.3;
  transition: opacity .3s ease;
  box-shadow: 0 5px 8px rgba(17, 43, 66, 0.1);
  border-radius: 5px;
  background-color: #ddd;
  padding: 1.5rem 4rem 1.5rem 1.6rem;
  position: fixed;
  z-index: 2;
  width: 800px;
  max-width: calc(100% - 3rem);
  left: 50%;
  transform: translateX(-50%);
  bottom: 1.2rem;
  display: flex;

  @include media_600 {
    width: calc(100% - 2.4rem);
  }

  a {
    color: $red;
  }

  span,
  a {
    font-size: 19px;
  }
}

.button-notice-close {
  position: absolute;
  top: 1.6rem;
  right: 1.7rem;
  width: 20px;
  height: 11px;
  padding-top: 11px;
  box-sizing: content-box;
  z-index: 2;
  cursor: pointer;
}

.button-notice-close span,
.button-notice-close span:before,
.button-notice-close span:after {
  height: 4px;
  width: 20px;
  background: $gray3;
  position: absolute;
  display: block;
  content: "";
}

.button-notice-close span:before {
  top: -11px;
}

.button-notice-close span:after {
  bottom: -11px;
}

.button-notice-close span,
.button-notice-close span:before,
.button-notice-close span:after {
  transition: all 200ms ease-in-out;
}

.button-notice-close span {
  background-color: transparent;
}

.button-notice-close span:before,
.button-notice-close span:after {
  top: 0;
}

.button-notice-close span:before {
  transform: rotate(45deg);
}

.button-notice-close span:after {
  transform: rotate(-45deg);
}
</style>
