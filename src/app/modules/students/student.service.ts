import { Student } from '../students/student.models';

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
  getAllStudentsFromDb,
  getSingleStudentFromDb,
  deleteStudentFromDb,
};
