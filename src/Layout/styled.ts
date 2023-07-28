import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

export const StyledRoot = styled(Box)(() => ({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden',
}));

export const StyledMain = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  padding: '40px 32px 80px',
  position: 'relative',
  [theme.breakpoints.down('lg')]: {
    padding: '80px 32px 80px',
  },
}));
