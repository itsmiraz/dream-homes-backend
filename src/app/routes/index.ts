import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { AdminRoutes } from '../modules/admin/admin.route';

const router = Router();

const ModuleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },

  {
    path: '/admin',
    route: AdminRoutes,
  },
];

ModuleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
