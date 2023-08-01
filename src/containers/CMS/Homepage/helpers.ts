import { Theme } from '@mui/material';

export const headCells = [
  {
    label: 'SLIDER',
  },
  {
    width: '227px',
    label: 'VISIBLE ON SITE',
  },
  {
    maxWidth: '284px',
    label: 'ACTIONS',
    colSpan: 3,
  },
];

// TODO: test and delete : It's fake data

export const createData = (
  slider: string,
  visibility: string,
) => {
  return { slider, visibility };
};

export const rows = [
  createData('Printing Products & Services', 'Yes'),
  createData('Banners & Sings', 'Yes'),
  createData('Labels & Stickers', 'Yes'),
  createData('Business Cards', 'Yes'),
  createData('Gingerbread', 'No'),
];

// TODO: USER ADD STATUS ENUM
export const gettingStatusColor = (status: string, theme: Theme) => {
  const colorObj:Record<string, string> = {
    active: theme.palette.custom.green[100],
    pending: theme.palette.custom.yellow[100],
  };

  return colorObj[status] || '';
};
