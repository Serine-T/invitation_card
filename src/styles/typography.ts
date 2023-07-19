import { Palette } from '@mui/material/styles/createPalette';
import { TypographyOptions } from '@mui/material/styles/createTypography';
import DMSansFont from '@assets/fonts/DMSans';
import { FontFamilyNames } from '@customTypes/global/theme/fonts';

const typography = (palette: Palette): TypographyOptions => ({
  allVariants: {
    fontFamily: FontFamilyNames.DmSansRegular,
    color: palette.text.primary,
    fontSize: 14,
  },
  fontFamily: [
    ...DMSansFont.fontFamily,
    'sans',
  ].join(', '),
  h1: {
    fontSize: 32,
    fontFamily: FontFamilyNames.DmSansBold,
    fontWeight: 700,
  },
  h2: {
    fontSize: 30,
    fontFamily: FontFamilyNames.DmSansBold,
    fontWeight: 700,
  },
  /** Used */
  h3: {
    fontSize: 28,
    fontFamily: FontFamilyNames.DmSansBold,
    fontWeight: 700,
  },
  /** Used */
  h4: {
    fontSize: 26,
    fontWeight: 700,
    fontFamily: FontFamilyNames.DmSansBold,
  },
  /** Used */
  h5: {
    fontSize: 24,
    fontFamily: FontFamilyNames.DmSansBold,
    fontWeight: 700,
  },
  h6: {
    fontSize: 22,
    fontFamily: FontFamilyNames.DmSansBold,
    fontWeight: 700,
  },
  h7: {
    fontSize: 20,
    fontFamily: FontFamilyNames.DmSansBold,
    fontWeight: 700,
  },
  h8: {
    fontSize: 18,
    fontFamily: FontFamilyNames.DmSansBold,
    fontWeight: 700,
  },
  h9: {
    fontSize: 16,
    fontFamily: FontFamilyNames.DmSansBold,
    fontWeight: 700,
  },
  h10: {
    fontSize: 14,
    fontFamily: FontFamilyNames.DmSansBold,
    fontWeight: 700,
  },
  /** Used */
  subtitle1: {
    fontSize: 20,
    fontWeight: 500,
    fontFamily: FontFamilyNames.DmSansMedium,
  },
  subtitle2: {
    fontSize: 18,
    fontWeight: 500,
    fontFamily: FontFamilyNames.DmSansMedium,
  },
  subtitle3: {
    fontSize: 16,
    fontWeight: 500,
    fontFamily: FontFamilyNames.DmSansMedium,
  },
  body1: {
    fontSize: 14,
    fontWeight: 400,
    fontFamily: FontFamilyNames.DmSansRegular,
  },
  body2: {
    fontSize: 16,
    fontWeight: 400,
    fontFamily: FontFamilyNames.DmSansRegular,
  },
  body3: {
    fontSize: 12,
    fontWeight: 400,
    fontFamily: FontFamilyNames.DmSansRegular,
  },
  overline: {
    textTransform: 'uppercase',
    fontFamily: FontFamilyNames.DmSansRegular,
  },
});

export default typography;
