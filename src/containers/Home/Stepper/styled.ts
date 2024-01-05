import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';

export const StyledIconBox = styled(Stack)(({ theme }) => ({
  width: 110,
  height: 110,
  background: theme.palette.primary.dark,
  borderRadius: '50%',
  [theme.breakpoints.down('xs')]: {
    width: 90,
    height: 90,
  },
}));

export const StyledImage = styled('img')(({ theme }) => ({
  width: 90,
  height: 90,
  borderRadius: '50%',
  marginLeft: '16px',
  marginTop: '6px',
  [theme.breakpoints.down('xs')]: {
    width: 70,
    height: 70,
  },
}));

export const StyledLink = styled(Link)(({ theme }) => ({
  color: theme.palette.primary.dark,
}));
export const StyledLine = styled(Link)(({ theme }) => ({
  height: '100px',
  width: '1px',
  background: theme.palette.primary.dark,
}));
