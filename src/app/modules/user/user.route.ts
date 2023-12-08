import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();

// router.post(
//   '/create-admin',
//   validateRequest(AdminValidationShcemas.createAdminValidationSchema),
//   UserController.createAdmin,
// );

router.post('/register', UserController.registerUser);

export const UserRoutes = router;
