import * as yup from 'yup';
import { EMAIL_REGEXP, PASSWORD_REGEXP, isIntagerRegex } from '@utils/regexp';

export const PasswordSchema = {
  password: yup
    .string()
    .required('Password is required')
    .matches(
      PASSWORD_REGEXP,
      'Password can’t include space',
    )
    .min(8, 'Password must be at least 8 characters')
    .max(16, 'Password must be at most 16 characters'),
};

export const EmailSchema = {
  email: yup
    .string()
    .required('Email is required')
    .matches(
      EMAIL_REGEXP,
      'Email must be a valid email',
    )
    .max(255, 'The maximum length is 255 characters'),
};

export const validateOptionalURL = yup.string().optional().test(
  'url-validation',
  'URL is invalid',
  (value: string | undefined) => {
    if (!value) {
      return true;
    }

    return yup.string().url().isValidSync(value);
  },
);

export const createTextWidthValidation = (maxLength: number) => {
  return yup.string().optional().test(
    'text-length-validation',
    `The maximum length is ${maxLength} characters`,
    (value: string | undefined) => {
      if (!value) {
        return true;
      }

      return yup.string().max(maxLength).isValidSync(value);
    },
  );
};

export const integerValidation = yup.string().optional().test(
  'valid-intager',
  'Intager is invalid',
  (value: string | undefined) => {
    if (!value) {
      return true;
    }

    return yup.string().matches(
      isIntagerRegex,
    )
      .isValidSync(value);
  },
);

export const numberValidation = yup.string().optional().test(
  'valid-number',
  'Number is invalid',
  (value: string | undefined) => {
    if (!value) {
      return true;
    }

    return numberSchema.isValidSync(value);
  },
);

export const positiveNumberSchema = yup
  .number()
  .typeError('Number is invalid')
  .positive('Number is not positive');

export const integerSchema = yup
  .number()
  .typeError('Number is invalid')
  .integer('Intager is invalid')
  .positive('Number is not positive');

export const numberSchema = yup
  .number()
  .typeError('Number is invalid')
  .min(0, 'Number is negative');
