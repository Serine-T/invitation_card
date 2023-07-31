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

export const rows = [
  {
    label: 'User Name',
    field: 'userName',
  },
  {
    label: 'First Name',
    field: 'firstName',
  },
  {
    label: 'Last Name',
    field: 'lastName',
  },
  {
    label: 'Password',
    field: 'password',
  },
  {
    label: 'Email',
    field: 'email',
  },
  {
    label: 'Production Only',
    field: 'userName',
  },
  {
    label: 'Social Only',
    field: 'userName',
  },
];
