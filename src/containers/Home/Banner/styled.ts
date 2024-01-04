import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';

export const StyledContainer = styled(Stack)(({ theme }) => ({
  height: '600px',
  width: '100%',
  position: 'relative',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: '20px',
  [theme.breakpoints.down('xs')]: {
    // marginTop: '-100px',
    // height: '450px',
    // marginBottom: '-10',
  },
}));

export const StyledImage = styled('img')(() => ({
  height: '500px',
  width: '100%',
  position: 'absolute',
  objectFit: 'contain',
  objectPosition: 'top center',
  top: 0,
}));
