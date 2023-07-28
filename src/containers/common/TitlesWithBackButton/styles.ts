import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

export const StyledContainer = styled(Stack)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '230px 1fr',

  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: '1fr',
    gridTemplateRows: 'auto auto',
  },
}));

export const StyledBox = styled(Box)(() => ({
  gridColumn: 1,
  gridRow: 1,
  minHeight: 30,
}));

export const ContentBox = styled(Box)(({ theme }) => ({
  gridColumn: 2,
  gridRow: '1 / span 2',
  display: 'grid',
  gridTemplateRows: '1fr 1fr',

  [theme.breakpoints.down('md')]: {
    gridColumn: 1,
    gridRow: '2 / span 2',
  },
}));
