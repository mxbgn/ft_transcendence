import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/pages/HomePage.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomePage },
    { path: '/login', name: 'login', component: () => import('@/pages/LoginPage.vue') },
    { path: '/register', name: 'register', component: () => import('@/pages/RegisterPage.vue') },
    { path: '/privacy', name: 'privacy', component: () => import('@/pages/PrivacyPage.vue') },
    { path: '/terms', name: 'terms', component: () => import('@/pages/TermsPage.vue') },
  ],
});

export default router;
