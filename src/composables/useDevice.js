import { ref, onMounted, onUnmounted } from 'vue';

export function useDevice() {
  const isMobile = ref(false);

  const check = () => {
    isMobile.value = window.innerWidth <= 768; // arbitrary mobile breakpoint
  };

  onMounted(() => {
    check();
    window.addEventListener('resize', check);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', check);
  });

  const isDesktop = ref(false);
  isDesktop.value = !isMobile.value;

  return { isMobile, isDesktop };
}
