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

// TODO: test and delete : It's fake data

export const createData = (
  name: string,
  calories: number,
  fat: number,
  carbs: string,
  protein: number,
) => {
  return { name, calories, fat, carbs, protein };
};

export const gettingStatusColor = (isVerified: boolean, theme: Theme) => {
  const colorObj:Record<string, string> = {
    active: theme.palette.custom.green[100],
    pending: theme.palette.custom.yellow[100],
  };

  return isVerified ? colorObj.active : colorObj.pending;
};
