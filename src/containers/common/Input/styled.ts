import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { FontFamilyNames } from '@customTypes/global/theme/fonts';
import Box from '@mui/material/Box';

export const StyledInputBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'errorMessage' && prop !== 'marginBottom',
})<{ marginBottom?: number; errorMessage?: boolean }>(({
  marginBottom = 0, errorMessage,
}) => ({
  marginBottom: errorMessage ? marginBottom - 8 : marginBottom,
}));

export const StyledBaseInput = styled(InputBase)(({ theme }) => ({
  '.MuiInputBase-input': {
    height: 15,
    padding: '10px 12px',
    fontSize: 12,
    fontFamily: FontFamilyNames.DmSansRegular,
    borderRadius: 4,

    '&::placeholder': {
      color: theme.palette.grey[300],
    },

    '&:-webkit-autofill': {
      WebkitBoxShadow: '0 0 0 100px white inset',
    },
  },
}));

export const StyledInputLabel = styled(InputLabel)(() => ({
  transform: 'unset',
  marginBottom: '6px',
}));

export const StyledFormControl = styled(FormControl)(({ theme }) => ({
  width: '100%',
  borderRadius: 4,
  padding: 0,
  border: `1px solid ${theme.palette.grey[500]}`,
  transition: theme.transitions.create([
    'border-color',
    'background-color',
    'box-shadow',
  ]),

  '.MuiInputAdornment-root': {
    paddingRight: 4,
    height: 16,
    svg: {
      fontSize: '16px',
      color: theme.palette.grey[300],
    },
  },

  '&:hover': {
    borderColor: theme.palette.common.black,
  },

  '&:has(.Mui-focused), &:has(.Mui-focused):hover': {
    borderColor: theme.palette.primary.dark,
  },

  '&:has(.Mui-error), &:has(.Mui-error):hover, &:has(.Mui-error):focus': {
    borderColor: theme.palette.error.dark,
  },

  '&:has(.Mui-disabled), &:has(.Mui-disabled:hover)': {
    borderColor: `${theme.palette.grey[500]}63`,
  },
}));
