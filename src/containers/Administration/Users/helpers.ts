import { IUserInfo, Permissions } from '@features/users/types';
import { Theme } from '@mui/material';

export const headCells = [
  {
    label: 'Username',
  },
  {
    label: 'Full Name',
  },
  {
    label: 'Email',
  },
  {
    label: 'Role',
  },
  {
    label: 'Status',
  },
  {
    label: 'Actions',
  },
];

export const gettingStatusColor = (isVerified: boolean, theme: Theme) => {
  const colorObj:Record<string, string> = {
    active: theme.palette.custom.green[100],
    pending: theme.palette.custom.yellow[100],
  };

  return isVerified ? colorObj.active : colorObj.pending;
};

export const formattedPermissions = (permissions: IUserInfo['permissions']) => {
  return permissions.map((item) => item.title);
};

export const formattedRole = (permissions: IUserInfo['permissions']) => {
  const list = formattedPermissions(permissions);

  if (list.includes(Permissions.USER_MANAGEMENT)) {
    return 'Superadmin';
  }

  const hasSocial = list.includes(Permissions.SOCIAL);
  const hasProduction = list.includes(Permissions.PRODUCTION);

  if (hasSocial && !hasProduction) {
    return 'Social';
  }

  if (hasProduction && !hasSocial) {
    return 'Production';
  }

  return 'Production, Social';
};
