import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { gettingColor } from './helpers';

interface StyledMuiTypographyProps{
  color?: string;
  underLine?: boolean;
}

export const StyledMuiTypography = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'color' && prop !== 'underLine',
})<StyledMuiTypographyProps>(({ theme, color = 'black', underLine = false }) => ({
  color: gettingColor(color, theme),
  textDecoration: underLine ? 'underline' : 'none',
}));
