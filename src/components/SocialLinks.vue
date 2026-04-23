<template>
  <ul :class="{ 'menu-bar': menuBar }" class="social_links">
    <li>
      <a
        href="https://www.linkedin.com/in/fabrice-pallaud-b8b4ba24/"
        class="linkedin"
      />
    </li>
    <li>
      <a
        href="https://github.com/fabricepallaud"
        class="github"
      />
    </li>
  </ul>
</template>

<script setup>
defineProps({
  menuBar: {
    type: Boolean
  }
})
</script>

<style lang="scss">
.social_links {
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 0;

  &.menu-bar {
    display: none;
    position: absolute;
    top: 10px;
    right: 75px;
    z-index: 0;

    @include media_600 {
      display: flex !important;
    }

    li + li {
      margin-left: 30px;
      top: 2px;
    }
  }

  li {
    display: inline-block;
    vertical-align: middle;

    & + li {
      margin-left: 20px;
    }
  }

  a {
    width: 41px;
    height: 41px;
    line-height: 41px;
    text-align: center;
    display: inline-block;
    background-repeat: no-repeat;
    background-position: 50% 50%;

    &.linkedin {
      background-color: $linkedin;
      background-image: url(@/assets/img/linkedin-in.svg);
      background-size: 22px auto;

      @include media_600 {
        background-color: transparent;
        background-size: auto 22px;
      }
    }

    &.github {
      background-color: $github;
      background-image: url(@/assets/img/github.svg);
      background-size: 27px auto;

      @include media_600 {
        background-color: transparent;
        background-size: auto 22px;
      }

      i {
      font-size: 30px;
      padding-top: 5px;
      }
    }

    @include media_600 {
      width: 25px;
      height: 25px;
    }
  }

  i {
    color: $white;
    font-size: 24px;
  }
}
</style>
