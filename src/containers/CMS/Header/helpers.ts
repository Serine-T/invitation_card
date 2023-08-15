import { Theme } from '@mui/material';

export const headSliderCells = [
  {
    id: '1',
    label: 'Category',
  },
  {
    id: '2',
    label: 'VISIBLE ON HEADER',
  },
  {
    id: '3',
    label: 'Type',
  },
  {
    id: '4',
    label: 'ACTIONS',
    colSpan: 2,
  },
];

// TODO: test and delete : It's fake data

export const createData = (
  category: string,
  visibility: string,
  type: string,
  id: string,
) => {
  return { category, visibility, type, id };
};

export const rows = [
  createData('Printing Products & Services', 'Yes', 'Cards', '1'),
  createData('Banners & Sings', 'Yes', 'Cards', '2'),
  createData('Labels & Stickers', 'Yes', 'Cards', '3'),
  createData('Business Cards', 'Yes', 'List', '4'),
  createData('Gingerbread', 'No', 'List', '5'),
];

// TODO: USER ADD STATUS ENUM
export const gettingStatusColor = (status: string, theme: Theme) => {
  const colorObj:Record<string, string> = {
    active: theme.palette.custom.green[100],
    pending: theme.palette.custom.yellow[100],
  };

  return colorObj[status] || '';
};
