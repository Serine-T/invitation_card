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
    &::-webkit-scrollbar {
      width: 5px;
      height: 8px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: #d5d5d5;
    }

    &::-webkit-scrollbar-track {
        box-shadow: inset 0px 0px 2px rgba(200, 200, 200, 1);
    }

    &::-webkit-scrollbar-track-piece {
        background-color: #e5e5e5;
    }
    a {
      text-decoration: none;
      color: initial;
    }
    .MuiBackdrop-root.MuiModal-backdrop {
      background-color: #06152B40; 
    }
  `.styles,
};
