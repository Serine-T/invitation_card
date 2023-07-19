import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

export const StyledErrorText = styled(Typography)(({ theme }) => ({
  color: theme.palette.error.dark,
  marginTop: 6,
}));
