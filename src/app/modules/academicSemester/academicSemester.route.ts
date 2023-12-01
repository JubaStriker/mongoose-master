import express from 'express';

const router = express.Router();

router.post('/create-academic-semester');

// router.get('/', StudentControllers.getAllStudents);

// router.get('/:id', StudentControllers.getSingleStudent);

// router.delete('/:id', StudentControllers.deleteStudent);

export const AcademicSemesterRoutes = router;
