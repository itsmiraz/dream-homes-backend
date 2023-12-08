export type TUser = {
  name: string;
  email: string;
  password: string;
  profileImg: string;
  role: 'admin' | 'user' | 'seller' | 'mod';
  isDeleted: boolean;
};
