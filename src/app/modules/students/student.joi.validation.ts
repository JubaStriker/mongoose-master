import Joi from 'joi';

// Creating a schema validation for joi
const userNameValidationSchema = Joi.object({
  firstName: Joi.string()
    .required()
    .max(30)
    .trim()
    .pattern(/^[A-Z][a-zA-Z]*$/, { name: 'capitalized' })
    .messages({
      'any.required': 'First Name is required',
      'string.max': 'First name is not allowed to exceed 30 characters.',
      'string.pattern.base':
        'First name must start with a capital letter and contain only letters.',
    }),
  middleName: Joi.string().allow('').optional(),
  lastName: Joi.string()
    .required()
    .pattern(/^[a-zA-Z]+$/, { name: 'alpha' })
    .messages({
      'any.required': 'Last Name is required',
      'string.pattern.base': 'Last name must contain only letters.',
    }),
});

const guardianValidationSchema = Joi.object({
  fatherName: Joi.string().required().messages({
    'any.required': 'Father Name is required',
  }),
  fatherOccupation: Joi.string().required().messages({
    'any.required': 'Father Occupation is required',
  }),
  fatherContactNo: Joi.string().required().messages({
    'any.required': 'Father Contact Number is required',
  }),
  motherName: Joi.string().required().messages({
    'any.required': 'Mother Name is required',
  }),
  motherOccupation: Joi.string().required().messages({
    'any.required': 'Mother Occupation is required',
  }),
  motherContactNo: Joi.string().required().messages({
    'any.required': 'Mother Contact Number is required',
  }),
});

const localGuardianValidationSchema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': 'Local Guardian Name is required',
  }),
  occupation: Joi.string().required().messages({
    'any.required': 'Local Guardian Occupation is required',
  }),
  contactNo: Joi.string().required().messages({
    'any.required': 'Local Guardian Contact Number is required',
  }),
  address: Joi.string().required().messages({
    'any.required': 'Local Guardian Address is required',
  }),
});

const studentValidationSchema = Joi.object({
  id: Joi.string().required().messages({
    'any.required': 'Student ID is required',
  }),
  name: userNameValidationSchema.required().messages({
    'any.required': 'Student Name is required',
  }),
  gender: Joi.string().valid('male', 'female', 'other').required().messages({
    'any.required': 'Gender is required',
    'any.only': 'Invalid gender',
  }),
  dateOfBirth: Joi.string().optional().allow('').messages({
    'string.empty': 'Date of Birth must not be empty',
  }),
  email: Joi.string().email().required().messages({
    'any.required': 'Email is required',
    'string.email': 'Email must be a valid email address',
  }),
  contactNo: Joi.string().required().messages({
    'any.required': 'Contact Number is required',
  }),
  emergencyContactNo: Joi.string().required().messages({
    'any.required': 'Emergency Contact Number is required',
  }),
  bloodGroup: Joi.string()
    .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
    .optional()
    .allow('')
    .messages({
      'any.only': 'Invalid blood group',
    }),
  presentAddress: Joi.string().required().messages({
    'any.required': 'Present Address is required',
  }),
  permanentAddress: Joi.string().required().messages({
    'any.required': 'Permanent Address is required',
  }),
  guardian: guardianValidationSchema.required().messages({
    'any.required': 'Guardian information is required',
  }),
  localGuardian: localGuardianValidationSchema.required().messages({
    'any.required': 'Local Guardian information is required',
  }),
  profileImage: Joi.string().optional().allow('').messages({
    'string.empty': 'Profile Image must not be empty',
  }),
  isActive: Joi.string()
    .valid('active', 'blocked')
    .default('active')
    .optional()
    .messages({
      'any.only': 'Invalid status',
    }),
});

export default studentValidationSchema;
