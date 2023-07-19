import { FontFamilyNames } from '@customTypes/global/theme/fonts';
import { Components, Theme } from '@mui/material';

export const MuiButton: Components<Theme>['MuiButton'] = {
  styleOverrides: {
    root: {
      fontFamily: FontFamilyNames.DmSansRegular,
      fontSize: '13px',
      lineHeight: '18px',
      padding: '7px 10px',
      letterSpacing: '0.16px',
      borderRadius: '16px',
      textTransform: 'none',
      boxShadow: 'unset',
      ':hover': {
        boxShadow: 'unset',
      },
    },
  },
};
