import { z } from 'zod';

const UserNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(1)
    .max(30)
    .refine(value => /^[A-Z][a-zA-Z]*$/.test(value), {
      message:
        'First name must start with a capital letter and contain only letters.',
    }),
  middleName: z.string().optional(),
  lastName: z
    .string()
    .min(1)
    .refine(value => /^[a-zA-Z]+$/.test(value), {
      message: 'Last name must contain only letters.',
    }),
});

const GuardianValidationSchema = z.object({
  fatherName: z.string(),
  fatherOccupation: z.string(),
  fatherContactNo: z.string(),
  motherName: z.string(),
  motherOccupation: z.string(),
  motherContactNo: z.string(),
});

const LocalGuardianSchema = z.object({
  name: z.string(),
  occupation: z.string(),
  contactNo: z.string(),
  address: z.string(),
});

const StudentValidationSchema = z.object({
  id: z.string(),
  name: UserNameValidationSchema,
  gender: z.enum(['male', 'female', 'other']),
  dateOfBirth: z.string().optional(),
  email: z.string().email(),
  contactNo: z.string(),
  emergencyContactNo: z.string(),
  bloodGroup: z
    .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
    .optional(),
  presentAddress: z.string(),
  permanentAddress: z.string(),
  guardian: GuardianValidationSchema,
  localGuardian: LocalGuardianSchema,
  profileImage: z.string().optional(),
  isActive: z.enum(['active', 'blocked']).optional(),
});

export default StudentValidationSchema;
