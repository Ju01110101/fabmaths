<script setup></script>

<template>
  <header class="banner">
    <div class="container container--header">
      <RouterLink class="header-branding" to="/">
        <img class="header-logo" src="@/assets/img/logo.svg" />
      </RouterLink>

      <ul class="menu">
        <li><RouterLink to="/">Home</RouterLink></li>
        <li><RouterLink to="about">About Me</RouterLink></li>
      </ul>
    </div>
  </header>
</template>

<style lang="scss" scoped>
//
//
//
//
//
//
//
//
// $blue: #055491;
// $pink: #bf206f;

// $secondary: #ed474a;
// $secondary: #4180a4;
// $secondary: #296e95;
// $secondary: #2d77a2;
$secondary: #c63d5d;

// $black: #272626;
// $black-rgb: rgb(39, 38, 38);

$black: #243f63;
$black-rgb: rgb(36, 63, 99);

$header-height: 60px;
$header-height-mobile: 52px;

//
//
//
//
//
//
//
//

body.thank-you,
body.landing {
  .banner {
    display: none;
  }
}

.banner {
  width: 100%;
  // height: 60px;
  height: $header-height;
  // border-bottom: 1px solid rgba(5, 84, 145, 0.25);
  // border-bottom: 1px solid rgba($black-rgb..., 0.25);
  border-bottom: 1px solid rgba($black-rgb, 0.25);
  display: flex;
  position: relative;
  overflow-x: hidden;

  @include media_600 {
    // height: 45px;
    // height: 52px;
    height: $header-height-mobile;
  }
}

.container.container--nav_primary {
  overflow: visible;
}

.container.container--header {
  width: $content_width;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 1;
  // overflow: hidden;
}

.header-branding {
  width: 155px;
  // height: 60px;
  height: $header-height;
  display: block;
  position: relative;
  display: flex;
  padding-right: 25px;
  background: rgba(0, 0, 0, 0.04);

  @include media_600 {
    max-width: 130px;
    // height: 45px;
    height: $header-height-mobile;
    padding-right: 20px;
    background: none;
  }

  &:after {
    position: absolute;
    content: '';
    width: 1px;
    // height: 60px;
    height: $header-height;
    right: 0;
    background: rgba($black-rgb, 0.22);

    @include media_600 {
      // height: 45px;
      height: $header-height-mobile;
    }
  }

  .header-logo {
    width: 100%;
    position: relative;
    top: -1px;
    z-index: 2;

    @include media_1000 {
      // top: auto;
      top: 1px;
    }
  }
}

:deep(.header-branding)::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  right: 100%; /* attach to the left side */
  width: 100vw; /* extend far enough */
  background: rgba(0, 0, 0, 0.04);

  @include media_600 {
    background: none;
  }
}

ul {
  display: flex;
  justify-content: space-between;

  li {
    position: relative;
    font-size: 16px;
    text-transform: uppercase;
    font-weight: 900;
    // line-height: 60px;
    // height: 60px;
    line-height: $header-height;
    height: $header-height;

    @include media_600 {
      // height: 45px;
      // line-height: 45px;
      height: $header-height-mobile;
      line-height: $header-height-mobile;
    }

    & + li {
      margin-left: 40px;

      @include media_600 {
        margin-left: 31px;
      }

      &:before {
        position: absolute;
        content: '';
        width: 1px;
        // height: 60px;
        height: $header-height;
        // background: rgba(5, 84, 145, 0.3);
        background: rgba($black-rgb, 0.3);
        left: -20px;

        @include media_600 {
          // height: 45px;
          height: $header-height-mobile;
          left: -15px;
        }
      }
    }

    a {
      // color: $blue;
      color: $black;
      display: block;
      position: relative;

      @include media_600 {
        top: 1px;
      }

      &:active {
        // top: 1px;

        @include media_600 {
          top: 2px;
        }
      }

      &.router-link-exact-active {
        // color: $pink;
        color: $secondary;

        &:after {
          position: absolute;
          content: '';
          height: 1px;
          width: 100%;
          left: 0;
          right: 0;
          bottom: calc(50% - 13px);
          // border-bottom: 1px solid $pink;
          border-bottom: 1px solid $secondary;
        }
      }
    }
  }
}
</style>
