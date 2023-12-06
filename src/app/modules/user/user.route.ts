import express from 'express';
import { UserController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AdminValidationShcemas } from '../admin/admin.validation';

const router = express.Router();

router.post(
  '/create-admin',
  validateRequest(AdminValidationShcemas.createAdminValidationSchema),
  UserController.createAdmin,
);

export const UserRoutes = router;
