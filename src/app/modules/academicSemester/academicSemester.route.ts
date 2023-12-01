import express from 'express';
import { AcademicSemesterControllers } from './academicSemester.contoller';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterValidation } from './academicSemesterValidation';

const router = express.Router();

router.post(
  '/create-academic-semester',
  validateRequest(AcademicSemesterValidation.CreateAcademicSemesterValidation),
  AcademicSemesterControllers.createAcademicSemester,
);

// router.get('/', StudentControllers.getAllStudents);

// router.get('/:id', StudentControllers.getSingleStudent);

// router.delete('/:id', StudentControllers.deleteStudent);

export const AcademicSemesterRoutes = router;
