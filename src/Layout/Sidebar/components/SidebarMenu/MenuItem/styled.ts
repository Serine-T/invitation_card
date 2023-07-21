import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

export const StyldMenuItem = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'isActive',
})<{isActive: boolean}>(({ isActive }) => ({
  color: isActive ? 'red' : '',
}));
