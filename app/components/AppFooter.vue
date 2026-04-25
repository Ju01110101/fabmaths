<script setup lang="ts"></script>

<template>
  <footer class="footer">
    <div class="container container--footer">
      <div class="footer__github">
        <!-- <img class="git" src="@/assets/img/git.png"> -->
        <!-- <a class="linktype2" href="https://github.com/fabricepallaud/fabricepallaud.com">
          This site's code on <strong>GitHub</strong>
        </a> -->
      </div>

      <div class="footer__copyright">
        <a class="header__branding header__branding--footer" href="/">
          <!-- <img
            class="header__branding__logo"
            src="@/assets/img/logo_desktop.svg"
          > -->
          <div class="logo_square" />
        </a>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
/*
.footer {
  background: url('@/assets/img/footer.jpg') 50% 0 repeat-x;
  height: 206px;
  box-sizing: border-box;
  padding: 40px 0;
  @include media_768 {
    padding: 15px 0 20px;
    height: auto;
    background-size: cover;
  }
}

.container.container--footer {
  display: flex;
  justify-content: space-between;
  padding-bottom: 6px;
  @include media_768 {
    justify-content: center;
  }
}

.footer__github,
.footer__copyright {
  color: $white;
}

.footer__github {
  display: flex;
  align-items: center;
  transform: translateY(6px);
  @include media_768 {
    margin-left: -20px;
  }
}

.git {
  margin-right: 1em;
  @include media_600 {
    max-width: 30px;
    margin-right: 0.5em;
  }
}

.footer__github {
  @include top_menu;
}

.footer__github a {
  color: $white;

  @include media_600 {
    font-size: 16px;
  }
}

.footer__github strong {
  color: $red;
}

.footer__copyright {
  margin-right: 35px;
  @include media_600 {
    display: none;
  }
}

.header__branding--footer {
  transform: scale(0.9);
}
*/
</style>
