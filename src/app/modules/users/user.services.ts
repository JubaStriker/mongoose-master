import config from '../../config';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../students/student.interface';
import { Student } from '../students/student.models';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generatedStudentId } from './user.utils';

const createStudentIntoDb = async (password: string, studentData: TStudent) => {
  // Create a user object
  const userData: Partial<TUser> = {}; // Use TUser type with all fields being optional
  userData.password = password;

  // If password is not given, use default password
  if (!password) {
    userData.password = config.default_pass as string;
  } else {
    userData.password = password;
  }

  // Set role for user
  userData.role = 'student';

  // Year semesterCode 4 digit number

  // find academic semester info
  const admissionSemester = await AcademicSemester.findById(
    studentData.admissionSemester,
  );

  // Set manually generated id
  userData.id = generatedStudentId(admissionSemester);

  // Create a user
  const newUser = await User.create(userData);

  // Create a new student
  if (Object.keys(newUser).length > 0) {
    // set id, _id as user
    studentData.id = newUser.id;
    studentData.user = newUser._id;

    const newStudent = await Student.create(studentData);
    return newStudent;
  }
};

export const UserServices = {
  createStudentIntoDb,
};
