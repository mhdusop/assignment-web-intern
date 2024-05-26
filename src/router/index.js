import { createRouter, createWebHistory } from 'vue-router';

//define a routes
const routes = [
   {
      path: '/',
      name: 'home',
      component: () => import('../views/user/index.vue')
   },
   {
      path: '/user',
      name: 'user.index',
      component: () => import('../views/user/index.vue')
   },
   {
      path: '/user/create',
      name: 'user.create',
      component: () => import('../views/user/create.vue')
   },
   {
      path: '/user/edit/:id',
      name: 'user.edit',
      component: () => import('../views/user/edit.vue')
   },
   {
      path: '/user/detail/:id',
      name: 'user.detail',
      component: () => import('../views/user/detail.vue')
   },
   {
      path: '/:catchAll(.*)',
      name: 'pages.not-found',
      component: () => import('../pages/notFoundPage.vue')
   }
]

// create router
const router = createRouter({
   history: createWebHistory(),
   routes
})

export default router