import { Request, Response } from 'express';
import { StudentServices } from './student.service';

const createStudent = async (req: Request, res: Response) => {
  try {
    const student = req.body;
    const result = await StudentServices.createStudentIntoDb(student);
    res.status(200).json({
      success: true,
      message: 'Student created successfully',
      data: result,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: e,
    });
  }
};

export const StudentControllers = {
  createStudent,
};
