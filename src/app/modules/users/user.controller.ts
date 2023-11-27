import { Request, Response } from 'express';
import { UserServices } from './user.services';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { password, student: studentData } = req.body;
    // const { error, value } = studentValidationSchema.validate(studentData);
    // console.log('ZOI', error, value);

    // Student Validation with zod
    // const zodParsedData = studentValidationSchema.parse(studentData);

    const result = await UserServices.createStudentIntoDb(
      password,
      studentData,
    );
    res.status(200).json({
      success: true,
      message: 'Student created successfully',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: e.message || 'Something went wrong',
      error: e,
    });
  }
};

export const UserControllers = {
  createStudent,
};
