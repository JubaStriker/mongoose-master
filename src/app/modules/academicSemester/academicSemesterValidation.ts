import { z } from 'zod';

const CreateAcademicSemesterValidation = z.object({
  body: z.object({
    name: z.enum(),
  }),
});

export const AcademicSemesterValidation = {
  CreateAcademicSemesterValidation,
};
