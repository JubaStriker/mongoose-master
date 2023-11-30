/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, RequestHandler, Response } from 'express';
import { StudentServices } from './student.service';
import catchAsync from '../../utils/catchAsync';

const getAllStudents = catchAsync(async (req, res) => {
  const result = await StudentServices.getAllStudentsFromDb();
  res.status(200).json({
    success: true,
    message: 'Students data fetched successfully',
    data: result,
  });
});

const getSingleStudent = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await StudentServices.getSingleStudentFromDb(id);
  res.status(200).json({
    success: true,
    message: 'Student data fetched successfully',
    data: result,
  });
});

const deleteStudent = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await StudentServices.deleteStudentFromDb(id);
  res.status(200).json({
    success: true,
    message: 'Student deleted successfully',
    data: result,
  });
});

export const StudentControllers = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
};
