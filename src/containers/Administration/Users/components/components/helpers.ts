import * as yup from 'yup';
import { EmailSchema, PasswordSchema } from '@utils/schemas';

export interface IAddUserForm {
  email: string;
  password: string;
}
export const AddUserSchema = yup.object().shape({
  email: EmailSchema.email,
  password: PasswordSchema.password,
});
