import { FC, memo } from 'react';

import { TypographyProps } from '@mui/material/Typography';

import { StyledEllipsisText } from './styled';

interface IEllipsisTextProps extends TypographyProps {
  line?: number;
}

const EllipsisText: FC<IEllipsisTextProps> = ({
  children,
  line,
  ...restProps
}) => (
  <StyledEllipsisText line={line} {...restProps}>{children}</StyledEllipsisText>
);

export default memo(EllipsisText);
