import { Request, Response, Router } from 'express';
import auth from './auth.route';
import ping from './ping.route';
import user from './user.route';

interface Route {
    path: string;
    route: Router;
}

const router = Router();
const routes: Route[] = [
    {
        path: '/ping',
        route: ping,
    },
    {
        path: '/auth',
        route: auth,
    },
    {
        path: '/user',
        route: user,
    },
    {
        path: '/admin',
        route: ping,
    },
];

routes.forEach((route) => {
    router.use(route.path, route.route);
});

router.get('/', (req: Request, res: Response) => {
    res.send({
        success: true,
        message: 'Welcome to E-Commerce API',
    });
});

export default router;
