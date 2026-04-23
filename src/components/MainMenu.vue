<template>
  <div :class="{ sticky: isSticky }" class="nav_primary_wrap">
    <nav class="nav_primary">
      <div class="container container--nav_primary">
        <ul>
          <li
            v-for="(item, i) in menu"
            :key="i"
            :class="item.icon"
          >
            <!-- <router-link :to="item.url" :class="activeClass(item.url)">
              {{ item.name }}
            </router-link> -->
          </li>
        </ul>

        <social-links :menu-bar="true" />
        <app-hamburger
          @click.native="hamburgerClick"
          aria-label="button-menu"
          class="app-hamburger"
        />
      </div>
    </nav>

    <mobile-navigation />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useMainStore } from '@/stores/mainStore'
const store = useMainStore()
import debounce from 'lodash.debounce'
import { MainMenu } from '@/utils/structures'
import SocialLinks from '@/components/SocialLinks.vue'
import AppHamburger from '@/components/AppHamburger.vue'
import MobileNavigation from '@/components/MobileNavigation.vue'
import { useRoute } from 'vue-router'
const route = useRoute()

const menu = ref(MainMenu)
const isSticky = ref(false)

const mobileMenuOpen = computed(() => store.mobileMenuOpen)

onMounted(() => {
  const menuLocation = computed(() => window.scrollY + document.querySelector('.nav_primary_wrap').getBoundingClientRect().top)

  const handleSCroll = (event) => {
    isSticky.value = window.scrollY > menuLocation.value
  }

  const debouncedScroll = debounce(handleSCroll, 5)
  window.addEventListener('scroll', debouncedScroll)
  handleSCroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', debouncedScroll)
})

const hamburgerClick = () => {
  store.mobileMenuOpen = !mobileMenuOpen.value
}

// const activeClass = (url) => {
//   return url === '/portfolio' && route.name === 'project' ? 'router-link-exact-active' : ''
// }
</script>

<style lang="scss">
.nav_primary_wrap,
.nav_primary {
  height: 54px;

  @include media_600 {
    height: auto;
  }
}

.nav_primary_wrap {
  &.sticky {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }

  @include media_600 {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
}

.nav_primary_regular {
  position: relative;
}

.nav_primary {
  background: $brown;
  padding: 12px 0;
  box-sizing: border-box;

  @include media_600 {
    padding: 11px 0;
  }

  ul {
    display: flex;
    justify-content: space-between;
  }

  li {
    padding-left: 35px;
    position: relative;
    font-family: 'icomoon';
    font-size: 22px;
    font-style: normal;
    font-weight: normal;
    line-height: 1;

    @include media_750 {
      padding-left: 0 !important;
      background: none !important;
    }

    & + li {
      margin-left: 60px;
      @include media_800 {
        margin-left: 40px;
      }
      @include media_750 {
        margin-left: 35px;
      }
      @include media_600 {
        margin-left: 29px;
      }
    }

    &:before {
      position: absolute;
      top: 3px;
      left: 0;
      @include media_750 {
        display: none;
      }
    }

    a {
      @include top_menu;
      color: $white;
      display: block;
    }

    &,
    &.menu-portfolio {
      a:hover {
        color: $red;
      }
    }

    &.menu-home {
      @include media_960 {
        display: none;
      }

      @include media_600 {
        display: block;
        text-indent: -9999px;
        background-size: contain !important;
        width: 25px;
        height: 28px;
        background: url('@/assets/img/logo_mobile.svg') 0 50% no-repeat !important;
      }

      &:before {
        content: "\e902";
      }
    }

    &.menu-about {
      background-position: 0 1px;
      padding-left: 32px;

      @include media_960 {
        margin: 0;
      }
      @include media_600 {
        margin-left: 32px;
      }

      &:before {
        content: "\e971";
      }
    }

    &.menu-contact {
      @include media_600 {
        margin-left: 0;
      }

      &:before {
        content: "\e96b";
        top: 4px;
      }
    }

    &.menu-portfolio {
      margin-left: auto;
      padding-left: 39px;

      @include media_600 {
        display: none;
      }

      &:before {
        content: "\e90f";
      }
    }

    &.menu-portfolio a {
      color: $yellow;
      @include media_600 {
        color: $white;
      }
      @include media_415 {
        color: $yellow;
      }
    }

    &.menu-about,
    &.menu-contact {
      @include media_600 {
        display: none;
      }
    }
  }
}

.mobile-navigation ul a.router-link-exact-active,
.nav_primary li a.router-link-exact-active {
  color: $red;
}

.app-hamburger {
  @include media_600_up {
    display: none;
  }
}
</style>
