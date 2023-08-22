export const headSliderCells = [
  {
    id: '1',
    label: 'SLIDER',
  },
  {
    id: '2',
    label: 'VISIBLE ON SITE',
  },
  {
    id: '3',
    label: 'ACTIONS',
    colSpan: 2,
  },
];

export const headBannerCells = [
  {
    label: 'BANNERS',
  },
  {
    label: 'VISIBLE ON SITE',
  },
  {
    label: 'ACTIONS',
    colSpan: 2,
  },
];

// TODO: test and delete : It's fake data

export const createData = (
  slider: string,
  visibility: string,
  id: string,
) => {
  return { slider, visibility, id };
};

export const rows = [
  createData('Printing Products & Services', 'Yes', '1'),
  createData('Banners & Sings', 'Yes', '2'),
  createData('Labels & Stickers', 'Yes', '3'),
  createData('Business Cards', 'Yes', '4'),
  createData('Gingerbread', 'No', '5'),
];
