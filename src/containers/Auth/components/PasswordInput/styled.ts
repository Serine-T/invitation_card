import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';

export const StyledSearchField = styled(TextField)(({ theme }) => ({
  '& label': {
    color: theme.palette.primary.light,
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: theme.palette.primary.light,
      borderWidth: '1px',
    },
    '&:hover fieldset, &.Mui-focused fieldset': {
      borderColor: theme.palette.primary.light,
    },
  },
}));

export const StyledInputAdornment = styled(InputAdornment)(() => ({
  paddingRight: 4,
  height: 16,
}));
export const StyledIconButton = styled(IconButton)(({ theme }) => ({
  svg: {
    width: '16px',
    height: '16px',
    color: theme.palette.grey[300],
  },
}));
