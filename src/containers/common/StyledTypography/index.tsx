import { FC, memo } from 'react';

import { TypographyProps } from '@mui/material/Typography';

import { StyledMuiTypography } from './styled';

interface IStyledTypographyProps extends TypographyProps {
  color?: string;
  underLine?: boolean;
  cursor?: string;
  isItalic?: boolean;
}

const StyledTypography: FC<IStyledTypographyProps> = ({
  children,
  color,
  underLine,
  cursor,
  isItalic,
  ...restProps
}) => (
  <StyledMuiTypography
    {...restProps}
    color={color}
    underLine={underLine}
    cursor={cursor}
    isItalic={isItalic}
  >
    {children}
  </StyledMuiTypography>
);

export default memo(StyledTypography);
