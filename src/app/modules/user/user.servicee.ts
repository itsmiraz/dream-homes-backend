import mongoose from 'mongoose';
import config from '../../config';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateAdminId } from './user.utils';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { Admin } from '../admin/admin.model';
import { TAdmin } from '../admin/admin.interface';

const createAdminIntoDb = async (password: string, payload: TAdmin) => {
  const userData: Partial<TUser> = {};

  // if passoword is not gived , use default password

  userData.password = password || (config.default_pass as string);

  // set student role
  userData.role = 'admin';

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    // Automatically generated Id
    userData.id = await generateAdminId();

    // Transaction 1
    // Create a new user
    const newUser = await User.create([userData], { session });

    //create a student
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to Create User');
    }
    // set id, _Id
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //referencing _ id

    // Transaction 2
    const newStudent = await Admin.create([payload], { session });

    if (!newStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failded to create Admin');
    }

    await session.commitTransaction();
    await session.endSession();
    return newStudent;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

export const UserServices = {
  createAdminIntoDb,
};
