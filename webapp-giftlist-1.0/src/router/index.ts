import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/login',
        name: 'Login',
        component: Home,
    },
    {
        path: '/register',
        name: 'Register',
        component: Home,
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "about" */ '../views/About.vue'),
    },
    {
        path: '/app',
        name: 'Dashboard',
        component: Home,
    },
    {
        path: '/app/profile',
        name: 'Profile',
        component: Home,
    },
    {
        path: '/app/lists/:id',
        name: 'List',
        component: Home,
    },
    {
        path: '/app/lists/shared/:code',
        name: 'Shared List',
        component: Home,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
