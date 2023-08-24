import * as yup from 'yup';
import { EMAIL_REGEXP, PASSWORD_REGEXP } from '@utils/regexp';

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
    .max(255, 'Must be less than 255 characters'),
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
