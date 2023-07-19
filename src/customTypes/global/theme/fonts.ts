import type { SerializedStyles } from '@emotion/serialize';

export enum FontFamilyNames {
  DmSansRegular = 'DM Sans',
  DmSansBold = 'DM Sans Bold',
  DmSansMedium = 'DM Sans Medium',
}

type FontFamily = typeof FontFamilyNames;

type Values = FontFamily[keyof FontFamily];

export interface ThemeFont {
  fontFamily: Values[];
  fontFaces: SerializedStyles;
}
