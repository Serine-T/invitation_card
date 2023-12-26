import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { gettingColor } from './helpers';

interface StyledMuiTypographyProps{
  color?: string;
  underLine?: boolean;
  cursor?: string;
  isItalic?: boolean;
}

export const StyledMuiTypography = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'color' && prop !== 'underLine' && prop !== 'cursor' && prop !== 'isItalic',
})<StyledMuiTypographyProps>(({ theme, cursor, color = 'black', underLine = false, isItalic }) => ({
  color: gettingColor(color, theme),
  textDecoration: underLine ? 'underline' : 'none',
  cursor: cursor ?? 'pointer',
  fontFamily: isItalic ? 'Marck Script, cursive' : '',
}));
