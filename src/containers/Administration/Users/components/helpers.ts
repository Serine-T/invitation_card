import * as yup from 'yup';
import { EmailSchema, PasswordSchema } from '@utils/schemas';
import { Permissions } from '@features/users/types';

export interface IAddUserForm {
  email: string;
  password: string;
  username: string;
  firstName: string;
  lastName: string;
  permissions: {
    [Permissions.PRODUCTION]: boolean;
    [Permissions.SOCIAL]: boolean;
  };
}

export const defaultValues = {
  email: '',
  password: '',
  username: '',
  firstName: '',
  lastName: '',
  permissions: {
    [Permissions.PRODUCTION]: false,
    [Permissions.SOCIAL]: false,
  },
};

export const AddUserSchema = yup.object().shape({
  email: EmailSchema.email,
  password: PasswordSchema.password,
  username: yup.string().required('Username is required'),
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  permissions: yup.object().shape({
    [Permissions.PRODUCTION]: yup.boolean().optional(),
    [Permissions.SOCIAL]: yup.boolean().optional(),
  }),
});

type ValidInputsNames = {
  label: string;
  field: keyof IAddUserForm;
}

export const inputsRows: ValidInputsNames[] = [
  {
    label: 'Username',
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

type ValidCheckboxsNames = {
  label: string;
  field:keyof IAddUserForm['permissions'];
}

export const checkboxRows: ValidCheckboxsNames[] = [
  {
    label: 'Production Only',
    field: Permissions.PRODUCTION,
  },
  {
    label: 'Social Only',
    field: Permissions.SOCIAL,
  },
];

export const superAdminPermissions = [Permissions.PRODUCTION, Permissions.SOCIAL, Permissions.USER_MANAGEMENT];

export const formattingPayload = (data: IAddUserForm) => {
  const { email, password, username, firstName, lastName, permissions } = data;

  const filteredPermissions = [];

  for (const item in permissions) {
    if (permissions[item as keyof IAddUserForm['permissions']]) {
      filteredPermissions.push(item as keyof IAddUserForm['permissions']);
    }
  }

  return ({
    email,
    password,
    username,
    firstName,
    lastName,
    permissions: filteredPermissions.length ? filteredPermissions : superAdminPermissions,
  });
};
