import { Request, Response } from 'express';
import { StudentServices } from './student.service';
import studentValidationSchema from './student.validation';

const createStudent = async (req: Request, res: Response) => {
  try {
    const studentData = req.body.student;
    // const { error, value } = studentValidationSchema.validate(studentData);
    // console.log('ZOI', error, value);

    // Student Validation with zod
    const zodParsedData = studentValidationSchema.parse(studentData);

    const result = await StudentServices.createStudentIntoDb(zodParsedData);
    res.status(200).json({
      success: true,
      message: 'Student created successfully',
      data: result,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: e,
    });
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDb();
    res.status(200).json({
      success: true,
      message: 'Students data fetched successfully',
      data: result,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: e,
    });
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = await StudentServices.getSingleStudentFromDb(id);
    res.status(200).json({
      success: true,
      message: 'Student data fetched successfully',
      data: result,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: e,
    });
  }
};

export const StudentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudent,
};
