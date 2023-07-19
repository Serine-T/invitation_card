import { EmailSchema } from '@utils/schemas';
import * as yup from 'yup';

export interface IForgetPasswordForm {
  email: string;
}
export const ForgetPasswordSchema = yup.object().shape({
  email: EmailSchema.email,
});
