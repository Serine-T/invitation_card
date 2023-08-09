import * as yup from 'yup';
import { EmailSchema, PasswordSchema } from '@utils/schemas';
import { IAddUserPayload, IUserInfo, Permissions } from '@features/users/types';

import { formattedPermissions } from '../helpers';

export interface IAddUserForm {
  id?: string;
  email: string;
  password?: string;
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

export const EditUserSchema = yup.object().shape({
  email: EmailSchema.email,
  password: yup.string().optional().test({
    test(value) {
      if (!value) {
        return true;
      }

      return PasswordSchema.password.isValidSync(value);
    },
  }),
  username: yup.string().required('Username is required'),
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  permissions: yup.object().shape({
    [Permissions.PRODUCTION]: yup.boolean().optional(),
    [Permissions.SOCIAL]: yup.boolean().optional(),
  }),
});

export const AddUserSchema = yup.object().shape({
  ...EditUserSchema.fields,
  password: PasswordSchema.password,
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
  const { id, email, password, username, firstName, lastName, permissions } = data;

  const filteredPermissions = Object.keys(permissions).filter(
    (item) => permissions[item as keyof IAddUserForm['permissions']],
  );

  const payload = {
    email,
    username,
    firstName,
    lastName,
    permissions: filteredPermissions.length ? filteredPermissions : superAdminPermissions,
  } as IAddUserPayload;

  if (id) {
    payload.id = id;
  }

  if (password) {
    payload.password = password;
  }

  return payload;
};

export const formattingDefaultValue = (data: IUserInfo) => {
  const permissions = formattedPermissions(data.permissions);

  const isUserManagment = permissions?.includes(Permissions.USER_MANAGEMENT);

  return {
    ...data,
    permissions: {
      [Permissions.PRODUCTION]: (permissions.includes(Permissions.PRODUCTION) && !isUserManagment),
      [Permissions.SOCIAL]: ((permissions.includes(Permissions.SOCIAL) && !isUserManagment)),
    },
  };
};
