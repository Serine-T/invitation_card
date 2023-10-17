import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

export const StyledBox = styled(Box)(({ theme }) => ({
  marginLeft: '-230px',
  marginRight: 'calc(1175px - 100vw)',
  [theme.breakpoints.down('lg')]: {
    marginLeft: 0,
    marginRight: 0,
  },
}));
