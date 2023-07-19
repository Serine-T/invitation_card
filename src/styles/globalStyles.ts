import { css } from '@mui/material/styles';
import { Components, Theme } from '@mui/material';
import DmSansFont from '@assets/fonts/DMSans';

export const MuiCssBaseline: Components<Theme>['MuiCssBaseline'] = {
  styleOverrides: css`
    ${DmSansFont.fontFaces}
  * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body, html {
      min-height: 100vh;
    }
    a {
      text-decoration: none;
      color: initial;
    }
  `.styles,
};
