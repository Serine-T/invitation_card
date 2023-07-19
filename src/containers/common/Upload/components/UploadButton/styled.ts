import { FontFamilyNames } from '@customTypes/global/theme/fonts';
import { styled } from '@mui/material/styles';
import { alpha } from '@mui/material';
import Button from '@mui/material/Button';

export const StyledButton = styled(Button)<{component?: string}>(({ theme }) => ({
  background: theme.palette.common.white,
  border: `1px solid ${theme.palette.grey[50]}`,
  borderRadius: '6px',
  padding: '15px',
  width: '100%',
  fontSize: 14,
  fontFamily: FontFamilyNames.DmSansRegular,
  letterSpacing: '-0.03em',
  color: alpha(theme.palette.common.white, 0.3),
}));
