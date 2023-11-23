import { StudentModel } from '../student.models';
import { Student } from './student.interface';

const createStudentIntoDb = async (studentData: Student) => {
  // const result = await StudentModel.create(studentData);
  const student = new StudentModel(studentData);
  const result = await student.save();
  return result;
};

const getAllStudentsFromDb = async () => {
  const result = await StudentModel.find();
  return result;
};
const getSingleStudentFromDb = async (id: string) => {
  const result = await StudentModel.findOne({ id: id });
  return result;
};

export const StudentServices = {
  createStudentIntoDb,
  getAllStudentsFromDb,
  getSingleStudentFromDb,
};
