<template>
  <div
    :class="{'active': mobileMenuOpen}"
    class="hamburger-button"
  >
    <span />
  </div>
</template>

<script setup>
import { computed } from 'vue' 
import { useMainStore } from '@/stores/mainStore'
const store = useMainStore()
const mobileMenuOpen = computed(() => store.mobileMenuOpen)
</script>

<style lang="scss">
$hamburger-button_width: 22px;
$hamburger-button_bar_space: 8px;
$hamburger-button_bar_thickness: 2px;

.hamburger-button {
  position: absolute;
  top: 12px;
  right: 20px;
  width: $hamburger-button_width;
  height: $hamburger-button_bar_space;
  padding-top: 11px;
  box-sizing: content-box;
  z-index: 2;
  cursor: pointer;
}

.hamburger-button span,
.hamburger-button span:before,
.hamburger-button span:after {
  height: $hamburger-button_bar_thickness;
  width: $hamburger-button_width;
  background: $white;
  position: absolute;
  display: block;
  content: "";
}

.hamburger-button span:before {
  top: -$hamburger-button_bar_space;
}

.hamburger-button span:after {
  bottom: -$hamburger-button_bar_space;
}

.hamburger-button span,
.hamburger-button span:before,
.hamburger-button span:after {
  transition: all 200ms ease-in-out;
}

.hamburger-button.active span {
  background-color: transparent;
}

.hamburger-button.active span:before,
.hamburger-button.active span:after {
  top: 0;
}

.hamburger-button.active span:before {
  transform: rotate(45deg);
}

.hamburger-button.active span:after {
  transform: rotate(-45deg);
}
</style>
