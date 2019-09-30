import { RouteConfig } from 'vue-router';

const routes: any[] = [
    {
        path: '/',
        component: () => import('@/views/WebGL/index.vue'),
        children: [
            {
                path: '/lesson1',
                name: 'lesson1',
                component: () => import('@/views/WebGL/lesson/1/index.vue')
            }
        ]
    }
];

export default routes;
