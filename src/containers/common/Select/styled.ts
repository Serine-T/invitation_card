import { styled } from '@mui/material/styles';
import MuiSelect from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';

export const StyledSelect = styled(MuiSelect)(() => ({
  '.MuiSelect-select.MuiOutlinedInput-input': {
    height: '15px',
    minHeight: '15px',
    padding: '10px 12px',
    fontSize: 14,
    borderRadius: 4,
    lineHeight: '15px',
  },
  'fieldset.MuiOutlinedInput-notchedOutline': {
    borderWidth: '1px',
  },
}));

// TODO: test it
export const StyledFormControl = styled(FormControl, {
  shouldForwardProp: (prop) => prop !== 'width',
})<{width?: string}>(({ theme, width }) => ({
  width: width ?? '100%',
  borderRadius: 4,
  padding: 0,
  background: theme.palette.common.white,

  'fieldset.MuiOutlinedInput-notchedOutline': {
    border: `1px solid ${theme.palette.grey[500]}`,
    borderWidth: '1px',
  },

  '&:has(:not(.Mui-disabled):hover), &:has(.Mui-error):hover': {
    'fieldset.MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.common.black,
      borderWidth: '1px',
    },
  },

  '&:has(.Mui-focused), &:has(.Mui-focused):hover': {
    'fieldset.MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.primary.dark,
      borderWidth: '1px',
    },
  },

  '&:has(.Mui-error), &:has(.Mui-error):hover': {
    'fieldset.MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.error.dark,
      borderWidth: '1px',
    },
  },

  '&:has(.Mui-disabled)': {
    'fieldset.MuiOutlinedInput-notchedOutline': {
      opacity: 0.63,
    },
  },
}));
