import { UserServices } from './user.servicee';
import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import jwt from 'jsonwebtoken';
import config from '../../config';
// const createAdmin = catchAsync(async (req, res) => {
//   const { password, admin: payload } = req.body;

//   const result = await UserServices.createAdminIntoDb(password, payload);

//   sendResponse(res, {
//     statusCode: httpStatus.CREATED,
//     success: true,
//     message: 'Admin is Created SuccessFully',
//     data: result,
//   });
// });
const registerUser = catchAsync(async (req, res) => {
  const payload = req.body;

  const result = await UserServices.registerUserIntoDb(payload);

  const token = jwt.sign(
    {
      id: result.email,
    },

    config.jwt_key as string,
    {
      expiresIn: '1d',
    },
  );

  res
    .cookie('accessToken', token, {
      httpOnly: true,
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    .status(201)
    .send({
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'User is registered SuccessFully',
      data: result,
    });
});

export const UserController = {
  registerUser,
};
