import { RouteConfig } from 'vue-router';

const routesCanvas: RouteConfig[] = [
    {
        meta: { title: 'canvas' },
        name: 'canvas',
        path: '/canvas',
        component: () => import('@/views/Canvas/index.vue'),
        children: [
            {
                meta: { title: '烟花', parent: 'canvas' },
                name: 'fireworks',
                path: 'fireworks',
                component: () => import('@/views/Canvas/Fireworks/index.vue'),
            }
        ]
    }
];

export default routesCanvas;
