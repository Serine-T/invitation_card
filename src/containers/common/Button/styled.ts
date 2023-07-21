import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { FontFamilyNames } from '@customTypes/global/theme/fonts';

export const StyledButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'isOutlined' && prop !== 'width',
})<{ width?: string | number; isOutlined?: boolean }>(({
  theme, width, isOutlined = false,
}) => ({
  width: width ?? '100%',
  height: 34,
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 10,
  border: '1px solid',
  lineHeight: 12,
  backgroundColor: isOutlined ? theme.palette.common.white : theme.palette.primary.dark,
  borderColor: theme.palette.primary.dark,
  borderRadius: 4,
  fontFamily: FontFamilyNames.DmSansRegular,
  color: isOutlined ? theme.palette.common.black : theme.palette.common.white,
  padding: '11px 12px',

  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
  '&:disabled': {
    backgroundColor: alpha(theme.palette.grey[500], 0.1),
    cursor: 'not-allowed',
  },
}));

export const StyledTextButton = styled(Button)(() => ({
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 10,
  padding: 0,
  margin: 0,
  minWidth: 'unset',
  '&:hover': {
    backgroundColor: 'unset',
  },
}));
