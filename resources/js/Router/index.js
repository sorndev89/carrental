// created router
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../Pages/Home.vue';
import NotFound from '../Pages/NotPage.vue';

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: NotFound,
        },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    // scro to top
    scrollBehavior(to, from, savedPosition) {
        return { top: 0 };
    },
});

export default router