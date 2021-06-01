import { createRouter, createWebHistory } from '@ionic/vue-router';
import Tabs from '../views/Tabs.vue';

const routes = [
  {
    path: '/',
    redirect: '/tabs/subscribe'
  },
  {
    path: '/tabs/',
    component: Tabs,
    children: [
      {
        path: '',
        redirect: '/tabs/subscribe'
      },
      {
        path: 'about',
        component: () => import('@/views/about.vue')
      },
      {
        path: 'subscribe',
        component: () => import('@/views/subscribe.vue')
      },
      {
        path: 'subscriptions',
        component: () => import('@/views/subscriptions.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
