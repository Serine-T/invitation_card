import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { FontFamilyNames } from '@customTypes/global/theme/fonts';
import CircularProgress from '@mui/material/CircularProgress';

export const StyledButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'isOutlined' && prop !== 'width' && prop !== 'isLoading',
})<{ width?: string | number; isOutlined?: boolean; isLoading?: boolean }>(({
  theme, width, isOutlined = false, isLoading = false,
}) => ({
  width: width ?? '100%',
  height: '34px',
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: '12px',
  border: '1px solid',
  lineHeight: '12px',
  backgroundColor: isOutlined ? theme.palette.common.white : theme.palette.primary.dark,
  borderColor: theme.palette.primary.dark,
  borderRadius: 4,
  fontFamily: FontFamilyNames.DmSansRegular,
  color: isOutlined ? theme.palette.primary.dark : theme.palette.common.white,
  padding: '11px 12px',

  '&:hover': {
    backgroundColor: isOutlined ? theme.palette.common.white : theme.palette.primary.dark,
  },
  '&:disabled': {
    backgroundColor: isLoading ? theme.palette.primary.dark : alpha(theme.palette.grey[500], 0.1),
    cursor: 'not-allowed',
  },
}));

export const StyledCircularProgress = styled(CircularProgress)(({ theme }) => ({
  color: theme.palette.common.white,
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
