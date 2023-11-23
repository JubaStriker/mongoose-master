import { Student } from '../student.models';
import { TStudent } from './student.interface';
import { Model } from 'mongoose';

const createStudentIntoDb = async (studentData: TStudent) => {
  // const result = await StudentModel.create(studentData);
  const student = new Student(studentData);
  if (await student.isUserExists(student.id)) {
    throw new Error(`Student already exists`);
  }
  const result = await student.save();
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

export const StudentServices = {
  createStudentIntoDb,
  getAllStudentsFromDb,
  getSingleStudentFromDb,
};

export type StudentMethods = {
  isUserExists(id: string): Promise<TStudent | null>;
};

export type StudentModel = Model<
  TStudent,
  Record<string, never>,
  StudentMethods
>;
