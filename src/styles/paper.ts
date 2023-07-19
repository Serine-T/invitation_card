import { COLORS } from '@customTypes/global/theme/colors';
import { Components, Theme } from '@mui/material';

export const MuiPaper: Components<Theme>['MuiPaper'] = {
  styleOverrides: {
    root: {
      borderRadius: '6px',
      background: COLORS.white.main,
    },
  },
};
