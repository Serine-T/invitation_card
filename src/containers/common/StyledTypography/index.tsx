import { FC, memo } from 'react';

import { TypographyProps } from '@mui/material/Typography';

import { StyledMuiTypography } from './styled';

interface IStyledTypographyProps extends TypographyProps {
  color?: string;
  underLine?: boolean;
  cursor?: string;
}

const StyledTypography: FC<IStyledTypographyProps> = ({
  children,
  color,
  underLine,
  cursor,
  ...restProps
}) => (
  <StyledMuiTypography
    {...restProps}
    color={color}
    underLine={underLine}
    cursor={cursor}
  >
    {children}
  </StyledMuiTypography>
);

export default memo(StyledTypography);
