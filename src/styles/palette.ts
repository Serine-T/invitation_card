import blue from '@mui/material/colors/blue';
import blueGrey from '@mui/material/colors/blueGrey';
import { PaletteOptions } from '@mui/material';
import { COLORS } from '@customTypes/global/theme/colors';

interface ExtendedPaletteOptions extends PaletteOptions{
  custom: any;
}

const palette:ExtendedPaletteOptions = {
  background: {
    default: COLORS.white.main,
    paper: COLORS.white.main,
  },
  primary: {
    contrastText: COLORS.white.main,
    dark: COLORS.primary.dark,
    main: COLORS.blue.main,
    light: COLORS.blue.light,
  },
  secondary: {
    contrastText: COLORS.white.main,
    main: COLORS.blue.main,
    light: blue.A400,
  },
  error: {
    contrastText: COLORS.red.dark,
    dark: COLORS.red.dark,
    main: COLORS.red.dark,
    light: COLORS.red.light,
  },
  text: {
    primary: COLORS.black.light,
    secondary: blueGrey[600],
  },
  common: {
    black: COLORS.black.light,
  },
  grey: COLORS.grey,
  // TODO: add another custom colors
  custom: {
    red: COLORS.red.dark,
    yellow: COLORS.yellow,
    green: COLORS.green,
  },
};

export default palette;
