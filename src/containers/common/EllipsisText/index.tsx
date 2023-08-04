import { FC, memo } from 'react';

import { TypographyProps } from '@mui/material/Typography';

import { StyledEllipsisText } from './styled';

interface IEllipsisTextProps extends TypographyProps {
  line?: number;
}

const EllipsisText: FC<IEllipsisTextProps> = ({
  children,
  line,
}) => (
  <StyledEllipsisText line={line}>{children}</StyledEllipsisText>
);

export default memo(EllipsisText);
