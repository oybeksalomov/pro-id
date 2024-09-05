import { createRouter, createWebHistory } from 'vue-router'
import {defineAsyncComponent} from "vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('@/pages/HomePage.vue'),
            meta: {
                layout: defineAsyncComponent(() => import('@/layouts/MainLayout.vue')),
            }
        },
        {
            path: '/sign-in',
            name: 'sign-in',
            component: () => import('@/pages/SignInPage.vue'),
            meta: {
                layout: defineAsyncComponent(() => import('@/layouts/AuthLayout.vue'))
            }
        }
    ]
})

export default router