import { PasswordSchema } from '@utils/schemas';
import * as yup from 'yup';

export interface INewPasswordForm {
  newPassword: string;
  conformPassword: string;
}

export const NewPasswordSchema = yup.object().shape({
  newPassword: PasswordSchema.password,
  conformPassword: PasswordSchema.password
    .required('Conform password is required')
    .oneOf([yup.ref('newPassword')], 'Passwords don’t match'),
});
