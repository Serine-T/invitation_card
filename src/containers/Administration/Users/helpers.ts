import { Theme } from '@mui/material';

export const headCells = [
  {
    label: 'Username',
  },
  {
    label: 'Full Name',
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

export const rows = [
  createData('Frozen yoghurt', 159, 6.0, 'active', 4.0),
  createData('Ice cream sandwich', 237, 9.0, 'active', 4.3),
  createData('Eclair', 262, 16.0, 'active', 6.0),
  createData('Cupcake', 305, 3.7, 'pending', 4.3),
  createData('Gingerbread', 356, 16.0, 'active', 3.9),
];

// TODO: USER ADD STATUS ENUM
export const gettingStatusColor = (status: string, theme: Theme) => {
  const colorObj:Record<string, string> = {
    active: theme.palette.custom.green[100],
    pending: theme.palette.custom.yellow[100],
  };

  return colorObj[status] || '';
};
