import styled from '@emotion/styled';

import StyledTypography from '../StyledTypography';

interface StyledEllipsisTextProps{
  line?: number;
}

export const StyledEllipsisText = styled(StyledTypography, {
  shouldForwardProp: (prop) => prop !== 'line',
})<StyledEllipsisTextProps>(({ line = 2 }) => ({
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: line,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}));
