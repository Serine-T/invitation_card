import { styled } from '@mui/material/styles';
import { FontFamilyNames } from '@customTypes/global/theme/fonts';

import { StyledTextButton } from '../../Button/styled';

export const StyledBackBox = styled(StyledTextButton)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  color: theme.palette.common.black,

  '.MuiTypography-root': {
    fontWeight: 500,
    fontFamily: FontFamilyNames.DmSansMedium,
  },

  svg: {
    fontSize: '12px',
  },
}));
