import { Router } from 'express';
import { UserRoute } from '../modules/users/user.route';
import { StudentRoute } from '../modules/students/student.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoute,
  },
  {
    path: '/students',
    route: StudentRoute,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

// router.use('/users', UserRoute);

export default router;
