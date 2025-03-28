import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'

export const Layout = () => import('@/layout/index.vue')

export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: '/',
    component: Layout,
    redirect: { name: 'dashboard' },
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        meta: {
          title: 'dashboard',
        },
      },
      {
        path: '404',
        component: () => import('@/views/error/404.vue'),
      },
    ],
  },
  {
    path: '/redirect',
    component: Layout,
    children: [
      {
        path: '/redirect/:path',
        name: 'redirect',
        component: () => import('@/views/RedirectView.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes,
})

export default router
