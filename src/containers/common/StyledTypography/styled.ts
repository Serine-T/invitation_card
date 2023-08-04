import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { gettingColor } from './helpers';

interface StyledMuiTypographyProps{
  color?: string;
  underLine?: boolean;
  cursor?: string;
}

export const StyledMuiTypography = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'color' && prop !== 'underLine' && prop !== 'cursor',
})<StyledMuiTypographyProps>(({ theme, cursor, color = 'black', underLine = false }) => ({
  color: gettingColor(color, theme),
  textDecoration: underLine ? 'underline' : 'none',
  cursor: cursor ?? 'pointer',
}));
