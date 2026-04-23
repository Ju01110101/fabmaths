import './assets/scss/main.scss'

// import axios from 'axios'
// axios.defaults.baseURL = import.meta.env.VITE_API_URL

import { createApp } from 'vue'

import App from './App.vue'
const app = createApp(App)

import { createPinia } from 'pinia'
app.use(createPinia())

import router from './router'
app.use(router)

import { i18n } from './i18n'
app.use(i18n)

/*
import Ripple from 'vue3-whr-ripple-directive'
Ripple.color = 'rgba(0, 0, 0, 0.035)'
app.directive('ripple', Ripple)
*/

/*
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';
const options = {
  position: 'bottom-right',
  timeout: 5000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: true,
  closeButton: 'button',
  icon: false,
  rtl: false
}
app.use(Toast, options)
*/

app.mount('#app')
