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
        path: 'tab1',
        component: () => import('@/views/Tab1.vue')
      },
      {
        path: 'subscribe',
        component: () => import('@/views/Tab2.vue')
      },
      {
        path: 'subscriptions',
        component: () => import('@/views/Tab3.vue')
      },
      {
        path: 'about',
        component: () => import('@/views/about.vue')
      }
    ]
  },
  {
    path: '/about',
    component: () => import('@/views/about.vue')
  }
  // {
  //   path: '/login',
  //   component: () => import('@/views/login.vue'),
  //   meta: {
  //     public: true,
  //     onlyWhenLoggedOut: true
  //   }
  // },
  // {
  //   path: '/signup',
  //   component: import('@/views/signup1.vue'),
  //   meta: {
  //     public: true,
  //     onlyWhenLoggedOut: true
  //   }
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
