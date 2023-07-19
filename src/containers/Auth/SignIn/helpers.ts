import * as yup from 'yup';
import { EmailSchema, PasswordSchema } from '@utils/schemas';

export interface ISignInForm {
  email: string;
  password: string;
}
export const SignInSchema = yup.object().shape({
  email: EmailSchema.email,
  password: PasswordSchema.password,
});
