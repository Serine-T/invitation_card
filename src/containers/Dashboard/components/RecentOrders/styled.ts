import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';

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
