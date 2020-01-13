import { RouteConfig } from 'vue-router';
import routesWebGL from './routes.webGL';
import routesCanvas from './routes.canvas';

const routes: RouteConfig[] = [
    {
        meta: { title: '首页' },
        name: 'home',
        path: '/',
        component: () => import('@/views/Home')
    },
    ...routesWebGL,
    ...routesCanvas
];

export default routes;
