import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@containers/common/Button';

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

export const StyledButton = styled(Button)(() => ({
  width: '110px',
  fontSize: '14px',
  fontWeight: 700,
}));
