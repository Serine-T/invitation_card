import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';

export const StyledStack = styled(Stack)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    width: '100%',
  },

  [theme.breakpoints.down('sm')]: {
    iframe: {
      width: '100%',
    },
  },
}));
