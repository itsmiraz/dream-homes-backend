import { User } from './user.model';

const findLastAdmin = async () => {
  const lastStudent = await User.findOne(
    {
      role: 'admin',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({ createdAt: -1 })
    .lean();

  return lastStudent?.id ? lastStudent?.id : undefined;
};

export const generateAdminId = async () => {
  let currentId = (0).toString();
  const lastStudentId = await findLastAdmin();

  if (lastStudentId) {
    currentId = lastStudentId.substring(5);
  }
  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `A-${incrementId}`;

  return incrementId;
};
