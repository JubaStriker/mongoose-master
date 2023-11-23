import { Student } from '../student.models';
import { TStudent } from './student.interface';

const createStudentIntoDb = async (studentData: TStudent) => {
  if (await Student.isUserExists(studentData.id)) {
    throw new Error(`Student already exists`);
  }
  const result = await Student.create(studentData);

  // const student = new Student(studentData);
  // if (await student.isUserExists(student.id)) {
  //   throw new Error(`Student already exists`);
  // }
  // const result = await student.save();

  return result;
};

const getAllStudentsFromDb = async () => {
  const result = await Student.find();
  return result;
};
const getSingleStudentFromDb = async (id: string) => {
  const result = await Student.findOne({ id: id });
  return result;
};

const deleteStudentFromDb = async (id: string) => {
  const result = await Student.updateOne({ id: id }, { isDeleted: true });
  console.log({ result });
  return result;
};

export const StudentServices = {
  createStudentIntoDb,
  getAllStudentsFromDb,
  getSingleStudentFromDb,
  deleteStudentFromDb,
};
