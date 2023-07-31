import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';

export const StyledStack = styled(Stack)<{component?: string}>(({ theme }) => ({
  width: '660px',

  [theme.breakpoints.down('lg')]: {
    maxWidth: 'calc(100vw - 64px)',
    // minWidth: '500px',
  },
}));
