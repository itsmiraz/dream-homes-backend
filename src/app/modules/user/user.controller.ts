import { UserServices } from './user.servicee';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';

const createAdmin = catchAsync(async (req, res) => {
  const { password, admin: payload } = req.body;

  const result = await UserServices.createAdminIntoDb(password, payload);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Admin is Created SuccessFully',
    data: result,
  });
});

export const UserController = {
  createAdmin,
};
