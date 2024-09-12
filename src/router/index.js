import { createRouter, createWebHistory } from 'vue-router'
import {defineAsyncComponent} from "vue";
import {useUserStore} from "@/stores/modules/user.js";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('@/pages/HomePage.vue'),
            meta: {
                requiresAuth: true,
                layout: 'MainLayout'
            }
        },
        {
            path: '/auth',
            name: 'auth',
            component: () => import('@/pages/auth/AuthPage.vue'),
            redirect: {name: 'sign-in'},
            meta: {
                requiresAuth: false,
                layout: 'AuthLayout'
            },
            children: [
                {
                    path: 'sign-in',
                    name: 'sign-in',
                    component: () => import('@/pages/auth/SignInPage.vue'),
                    meta: {
                        requiresAuth: false
                    }
                },
                {
                    path: 'sign-up',
                    name: 'sign-up',
                    component: () => import('@/pages/auth/SignUpPage.vue'),
                    meta: {
                        requiresAuth: false
                    }
                },
                {
                    path: 'send-code',
                    name: 'send-code',
                    component: () => import('@/pages/auth/SmsCodePage.vue'),
                    meta: {
                        requiresAuth: false
                    }
                },
            ]
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'notFound',
            component: () => import('@/pages/NotFound.vue'),
            meta: {
                requiresAuth: true,
                layout: 'BlankLayout'
            }
        }

    ]
})

router.beforeEach((to, from, next) => {
    const userStore = useUserStore()
    const isAuthenticated = !!userStore.getAccessToken

    if (to.meta.requiresAuth && !isAuthenticated) {
        next({ name: 'sign-in' });
    } else if (!to.meta.requiresAuth && isAuthenticated && to.name !== 'home') {
        next({ name: 'home' });
    } else {
        next();
    }
})

export default router