import { RouteConfig } from 'vue-router';

const routesWebGl: RouteConfig[] = [
    {
        meta: { title: 'webGL' },
        name: 'webGL',
        path: '/webGL',
        component: () => import('@/views/WebGL/index.vue'),
        children: [
            {
                meta: { title: 'lesson1', parent: 'webGL' },
                name: 'lesson1',
                path: 'lesson1',
                component: () => import('@/views/WebGL/lesson/1/index.vue')
            }
        ]
    }
];

export default routesWebGl;
