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
      role: result.role,
    },

    config.jwt_key as string,
    {
      expiresIn: '1d',
    },
  );
  //   .cookie('dreamHomeAccessToken', token, {
  //   httpOnly: true,
  //   secure: false, // Set to true if your app is served over HTTPS
  //   sameSite: 'none',
  //   maxAge: 7 * 24 * 60 * 60 * 1000,
  // })
  res.status(201).send({
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'User is registered SuccessFully',
    data: result,
    token: token,
  });
});

const loginUser = catchAsync(async (req, res) => {
  const payload = req.body;

  const result = await UserServices.loginUser(payload);

  const token = jwt.sign(
    {
      id: result.email,
      role: result.role,
    },

    config.jwt_key as string,
    {
      expiresIn: '1d',
    },
  );
  //  .cookie('dreamHomeAccessToken', token, {
  //   httpOnly: true,
  //   secure: false, // Set to true if your app is served over HTTPS
  //   sameSite: 'none',
  //   maxAge: 7 * 24 * 60 * 60 * 1000,
  // })
  res.status(201).send({
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'User is login SuccessFully',
    data: result,
    token: token,
  });
});
export const UserController = {
  registerUser,
  loginUser,
};
