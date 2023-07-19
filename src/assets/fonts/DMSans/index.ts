import { css } from '@mui/material/styles';
import { FontFamilyNames, ThemeFont } from '@customTypes/global/theme/fonts';

import DMSansBold from './DMSans-Bold.ttf';
import DmSansMedium from './DMSans-Medium.ttf';
import DmSansRegular from './DMSans-Regular.ttf';

const DmSansFont: ThemeFont = {
  fontFamily: [
    FontFamilyNames.DmSansBold,
    FontFamilyNames.DmSansMedium,
    FontFamilyNames.DmSansRegular,
  ],
  fontFaces: css`
    @font-face {
      font-family: ${FontFamilyNames.DmSansBold};
      font-style: normal;
      font-display: swap;
      src: local(${FontFamilyNames.DmSansBold}),
        local('DMSans-Bold'),
        url(${DMSansBold}) format('truetype'),
        url(${DMSansBold}) format('woff'); /* Pretty Modern Browsers */
    }

    @font-face {
      font-family: ${FontFamilyNames.DmSansMedium};
      font-style: normal;
      font-display: swap;
      src: local(${FontFamilyNames.DmSansMedium}),
        local('DMSans-Medium'),
        url(${DmSansMedium}) format('truetype'),
        /* Safari, Android, iOS */ url(${DmSansMedium})
          format('woff'); /* Pretty Modern Browsers */
    }

    @font-face {
      font-family: ${FontFamilyNames.DmSansRegular};
      font-style: normal;
      font-display: swap;
      src: local(${FontFamilyNames.DmSansRegular}), local('DMSans-Regular'),
        url(${DmSansRegular}) format('truetype'),
        url(${DmSansRegular}) format('woff');
    }
  `,
};

export default DmSansFont;
