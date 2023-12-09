import AppError from '../../errors/AppError';
import { User } from './user.model';
import bcrypt from 'bcryptjs';

type TPayloadData = {
  name: string;
  email: string;
  password: string;
  isSeller: boolean;
};

const registerUserIntoDb = async (payload: TPayloadData) => {
  const newUser = new User({
    ...payload,
    role: payload.isSeller ? 'seller' : 'user',
  });

  const result = await newUser.save();
  return result;
};

const loginUser = async (payload: Partial<TPayloadData>) => {
  const { password, email } = payload;
  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError(404, 'Invalid User Email');
  }

  // Use bcrypt.compare to compare the entered password with the stored hashed password
  const passwordMatch = await bcrypt.compare(
    password as string,
    user?.password,
  );

  if (!passwordMatch) {
    throw new AppError(404, 'Incorrect Password');
  }
  return user;
};

export const UserServices = {
  registerUserIntoDb,
  loginUser,
};
