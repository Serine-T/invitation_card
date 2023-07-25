import { Theme } from '@mui/material';

export const gettingColor = (color: string, theme: Theme) => {
  const colorObj:Record<string, string> = {
    red: theme.palette.error.dark,
    blue: theme.palette.primary.dark,
    grey: theme.palette.grey[300],
  };

  return colorObj[color];
};
