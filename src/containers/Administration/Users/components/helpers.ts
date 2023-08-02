import * as yup from 'yup';
import { EmailSchema, PasswordSchema } from '@utils/schemas';
import { Permissions } from '@features/users/types';

export interface IAddUserForm {
  email: string;
  password: string;
  username: string;
  firstName: string;
  lastName: string;
  [Permissions.PRODUCTION]?: boolean;
  [Permissions.SOCIAL]?: boolean;
}

export const defaultValues = {
  email: '',
  password: '',
  username: '',
  firstName: '',
  lastName: '',
  [Permissions.PRODUCTION]: true,
  [Permissions.SOCIAL]: true,
};

export const AddUserSchema = yup.object().shape({
  email: EmailSchema.email,
  password: PasswordSchema.password,
  username: yup.string().required('Username is required'),
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
});

type ValidFieldNames = {
  label: string;
  field: keyof IAddUserForm;
}

export const inputsRows: ValidFieldNames[] = [
  {
    label: 'User Name',
    field: 'username',
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
];

export const checkboxRows: ValidFieldNames[] = [
  {
    label: 'Production Only',
    field: Permissions.PRODUCTION,
  },
  {
    label: 'Social Only',
    field: Permissions.SOCIAL,
  },
];