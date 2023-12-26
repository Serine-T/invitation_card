import { Palette } from '@mui/material/styles/createPalette';
import { TypographyOptions } from '@mui/material/styles/createTypography';

const typography = (palette: Palette): TypographyOptions => ({
  allVariants: {
    color: palette.text.primary,
    fontSize: 14,
  },
  h1: {
    fontSize: 32,
    fontWeight: 700,
  },
  h2: {
    fontSize: 30,
    fontWeight: 700,
  },
  /** Used */
  h3: {
    fontSize: 28,
    fontWeight: 700,
  },
  /** Used */
  h4: {
    fontSize: 26,
    fontWeight: 700,
  },
  /** Used */
  h5: {
    fontSize: 24,
    fontWeight: 700,
  },
  h6: {
    fontSize: 22,
    fontWeight: 700,
  },
  h7: {
    fontSize: 20,
    fontWeight: 700,
  },
  h8: {
    fontSize: 18,
    fontWeight: 700,
  },
  h9: {
    fontSize: 16,
    fontWeight: 700,
  },
  h10: {
    fontSize: 14,
    fontWeight: 700,
  },
  /** Used */
  subtitle1: {
    fontSize: 20,
    fontWeight: 500,
  },
  subtitle2: {
    fontSize: 18,
    fontWeight: 500,
  },
  subtitle3: {
    fontSize: 16,
    fontWeight: 500,
  },
  body1: {
    fontSize: 14,
    fontWeight: 400,
  },
  body2: {
    fontSize: 16,
    fontWeight: 400,
  },
  body3: {
    fontSize: 12,
    fontWeight: 400,
  },
  body4: {
    fontSize: 10,
    fontWeight: 400,
  },
  overline: {
    textTransform: 'uppercase',
  },
});

export default typography;
