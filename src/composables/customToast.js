import { useToast } from 'vue-toastification'
const toast = useToast()

export const customToast = (text) => {
  toast(text, {
    position: 'bottom-right',
    timeout: 40000,
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
  })
}