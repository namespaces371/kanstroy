import { createRouter, createWebHistory } from '@ionic/vue-router';
import mainWrapper from '@/views/mainWrapper.vue'
const routes = [
  {
    path: '/',
    redirect: '/welcome'
  },
  {
    path: '/welcome',
    name: 'Welcome',
    component: () => import('@/views/WelcomePage.vue')
  },

  {
    path: '/mainTabs/',
    component: mainWrapper,
    children: [
      {
        path: '',
        redirect: '/mainTabs/mainPage'
      },
      {
        path: 'mainPage',
        component: () => import('@/views/mainTabs/mainPage.vue')
      },   
      {
        path: 'inWorksPage',
        component: () => import('@/views/mainTabs/inWorksPage.vue')
      },
      {
        path: 'catalogPage',
        component: () => import('@/views/mainTabs/catalogPage.vue')
      },   
      {
        path: 'profilePage',
        component: () => import('@/views/mainTabs/profilePage.vue')
      },                          
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
