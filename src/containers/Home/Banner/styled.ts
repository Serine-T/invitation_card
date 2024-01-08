import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';

export const StyledContainer = styled(Stack)(() => ({
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: '20px',
}));

export const StyledImage = styled('img')(({ theme }) => ({
  height: '500px',
  width: '100%',
  objectFit: 'contain',
  objectPosition: 'top center',
  top: 0,
  [theme.breakpoints.down('md')]: {
    height: 'unset',
  },
}));
