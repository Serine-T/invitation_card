import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

export const StyledContainer = styled(Box)(({ theme }) => ({
  maxWidth: '540px',
  padding: '40px 32px 80px',
  display: 'flex',
  height: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: '0 auto',
  [theme.breakpoints.down('lg')]: {
    padding: '60px 32px 80px',
  },
}));
