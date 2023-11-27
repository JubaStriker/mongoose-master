import { Schema, model } from 'mongoose';
import {
  // StudentMethods,
  StudentModel,
  TGuardian,
  TLocalGuardian,
  TStudent,
  TUserName,
} from './student.interface';
import validator from 'validator';
import bcrypt from 'bcrypt';
import config from '../../config';
const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First Name is required'],
    maxlength: [30, 'First name is not allowed to more than 20 characters.'],
    trim: true,
    validate: {
      validator: function (value: string) {
        const firstNameValue = value.charAt(0).toUpperCase() + value.slice(1);
        return value === firstNameValue;
      },
      message: '{VALUE} is not capitalized format.',
    },
  },
  middleName: { type: String },
  lastName: {
    type: String,
    required: [true, 'Last Name is required'],
    validate: {
      validator: (value: string) => {
        validator.isAlpha(value);
      },
      message: '{VALUE} is not valid',
    },
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: { type: String, required: [true, 'Father Name is required'] },
  fatherOccupation: {
    type: String,
    required: [true, 'Father Occupation is required'],
  },
  fatherContactNo: {
    type: String,
    required: [true, 'Father Contact Number is required'],
  },
  motherName: { type: String, required: [true, 'Mother Name is required'] },
  motherOccupation: {
    type: String,
    required: [true, 'Mother Occupation is required'],
  },
  motherContactNo: {
    type: String,
    required: [true, 'Mother Contact Number is required'],
  },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: { type: String, required: [true, 'Local Guardian Name is required'] },
  occupation: {
    type: String,
    required: [true, 'Local Guardian Occupation is required'],
  },
  contactNo: {
    type: String,
    required: [true, 'Local Guardian Contact Number is required'],
  },
  address: {
    type: String,
    required: [true, 'Local Guardian Address is required'],
  },
});

const studentSchema = new Schema<TStudent, StudentModel>(
  {
    id: {
      type: String,
      required: [true, 'Student ID is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password ID is required'],
      maxLength: [20, 'Password cannot be more than 20 characters'],
    },
    name: {
      type: userNameSchema,
      required: [true, 'Student Name is required'],
    },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female', 'other'],
        message: '{VALUE} is not a valid gender',
      },
      required: [true, 'Gender is required'],
    },
    dateOfBirth: { type: String },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      validate: {
        validator: (value: string) => {
          validator.isEmail(value);
        },
        message: '{VALUE} is not a valid email',
      },
    },
    contactNo: { type: String, required: [true, 'Contact Number is required'] },
    emergencyContactNo: {
      type: String,
      required: [true, 'Emergency Contact Number is required'],
    },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
    presentAddress: {
      type: String,
      required: [true, 'Present Address is required'],
    },
    permanentAddress: {
      type: String,
      required: [true, 'Permanent Address is required'],
    },
    guardian: {
      type: guardianSchema,
      required: [true, 'Guardian information is required'],
    },
    localGuardian: {
      type: localGuardianSchema,
      required: [true, 'Local Guardian information is required'],
    },
    profileImage: { type: String },
    isActive: {
      type: String,
      enum: ['active', 'blocked'],
      default: 'active',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

//virtual
studentSchema.virtual('fullName').get(function () {
  return `${this.name.firstName}${
    this.name.middleName ? this.name.middleName : ''
  } ${this.name.lastName}`;
});

// pre save middleware/hook
studentSchema.pre('save', async function (next) {
  console.log(this, 'pre hook : we will save the data');
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  // Hashing password and save into DB
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

studentSchema.post('save', function (doc, next) {
  doc.password = '';
  console.log(this, 'post hook : we saved the data');
  next();
});

studentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
studentSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

// Creating a custom static method
studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};

// Creating a custom instance method
// studentSchema.methods.isUserExists = async function (id: string) {
//   const existingUser = await Student.findOne({ id });
//   return existingUser;
// };

export const Student = model<TStudent, StudentModel>('Student', studentSchema);
