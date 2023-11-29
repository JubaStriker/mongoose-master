import { NextFunction, Request, Response } from 'express';
import { UserServices } from './user.services';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
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

    sendResponse(res, {
      success: true,
      message: 'Student created successfully',
      data: result,
      statusCode: httpStatus.OK,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    next(e);
    sendResponse(res, {
      success: false,
      message: 'Student creation failed',
      data: e,
      statusCode: httpStatus.OK,
    });
  }
};

export const UserControllers = {
  createStudent,
};
