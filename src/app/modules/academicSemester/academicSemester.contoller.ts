import { NextFunction, Request, Response } from 'express';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { AcademicSemesterServices } from './academicSemester.services';

const createAcademicSemester = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await AcademicSemesterServices.createAcademicSemesterIntoDb(
      req.body,
    );
    sendResponse(res, {
      success: true,
      message: 'Academic semester created successfully',
      data: result,
      statusCode: httpStatus.OK,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    next(e);
    sendResponse(res, {
      success: false,
      message: e.message || 'Academic semester creation failed',
      data: e,
      statusCode: httpStatus.OK,
    });
  }
};

export const AcademicSemesterControllers = {
  createAcademicSemester,
};
