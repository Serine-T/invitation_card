import styled from '@emotion/styled';
import MuiTypography from '@mui/material/Typography';

interface StyledEllipsisTextProps{
  line?: number;
}

export const StyledEllipsisText = styled(MuiTypography, {
  shouldForwardProp: (prop) => prop !== 'line',
})<StyledEllipsisTextProps>(({ line = 2 }) => ({
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: line,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
}));
