import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

interface StyledMuiTypographyProps{
  color?: string;
  underLine?: boolean;
}

export const StyledMuiTypography = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'color' && prop !== 'underLine',
})<StyledMuiTypographyProps>(({ theme, color = 'black', underLine = false }) => ({
  color: color === 'blue' ? theme.palette.primary.dark : (color === 'grey' ? theme.palette.grey[300] : ''),
  textDecoration: underLine ? 'underline' : 'none',
}));
