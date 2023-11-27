import { z } from 'zod';

const UserValidation = z.object({
  password: z
    .string({
      invalid_type_error: 'Password must be a string',
    })
    .max(20, { message: 'Password cannot be more than 20 characters' })
    .optional(),
  role: z.enum(['admin', 'student', 'faculty']),
});

export default UserValidation;
