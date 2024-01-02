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
    marginTop: '-100px',
    height: '550px',
    marginBottom: 0,
  },
}));
