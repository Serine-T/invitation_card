import * as yup from 'yup';
import { EMAIL_REGEXP, PASSWORD_REGEXP, isIntagerRegex, isNumberRegex } from '@utils/regexp';

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

export const textWidthValidation = yup.string().optional().test(
  'text-length-validation',
  'The maximum length is 250 characters',
  (value: string | undefined) => {
    if (!value) {
      return true;
    }

    return yup.string().max(250).isValidSync(value);
  },
);
export const intagerValidation = yup.string().optional().test(
  'valid-intager',
  'Number is not intager',
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

    return yup.string().matches(
      isNumberRegex,
    )
      .isValidSync(value);
  },
);
