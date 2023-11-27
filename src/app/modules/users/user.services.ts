import config from '../../config';
import { TStudent } from '../students/student.interface';
import { TUser } from './user.interface';
import { User } from './user.model';

const createStudentIntoDb = async (password: string, studentData: TStudent) => {
  // Create a user object
  const userData: Partial<TUser> = {};
  userData.password = password;

  // If password is not given, use default password
  if (!password) {
    userData.password = config.default_pass as string;
  } else {
    userData.password = password;
  }

  // Set role for user
  userData.role = 'student';

  // Set manually generated id
  userData.id = '2023100001';

  // Create a user
  const result = await User.create(userData);

  // Create a new student
  if (Object.keys(result).length > 0) {
    // set id, _id as user
    studentData.id = result.id;
    studentData.user = result._id;
  }
  return result;
};

export const UserServices = {
  createStudentIntoDb,
};
