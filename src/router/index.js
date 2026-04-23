import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/views/Home.vue')
    },
    {
      path: '/about',
      component: () => import('@/views/About.vue')
    },
    {
      path: '/cookie-policy',
      component: () => import('@/views/CookiePolicy.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component: () => import('@/views/NotFound.vue')
    },
    {
      path: '/landing-v01',
      name: 'landing-v01',
      component: () => import('../views/Landing-v01.vue')
    },
    {
      path: '/contact',
      name: 'Contact',
      component: () => import('../views/Contact.vue')
    },
    {
      path: '/thank-you',
      name: 'ThankYou',
      component: () => import('../views/ThankYou.vue')
    }
  ]
})

export default router
