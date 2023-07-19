import { createTheme, responsiveFontSizes } from '@mui/material/styles';

import palette from './palette';
import shadows from './shadows';
import typography from './typography';
import { breakpoints } from './breakpoints';
import { MuiButton } from './buttons';
import { MuiPaper } from './paper';
import { MuiCssBaseline } from './globalStyles';

const theme = createTheme({
  palette,
  shadows,
  typography,
  components: {
    MuiButton,
    MuiPaper,
    MuiCssBaseline,
  },
  breakpoints,
});

export default responsiveFontSizes(theme);
