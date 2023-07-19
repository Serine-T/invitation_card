import { FC, memo } from 'react';

import { TypographyProps } from '@mui/material/Typography';

import { StyledMuiTypography } from './styled';

interface IStyledTypographyProps extends TypographyProps {
  color?: string;
  underLine?: boolean;
}

const StyledTypography: FC<IStyledTypographyProps> = ({
  children,
  color,
  underLine,
  ...restProps
}) => (
  <StyledMuiTypography
    {...restProps}
    color={color}
    underLine={underLine}
  >
    {children}
  </StyledMuiTypography>
);

export default memo(StyledTypography);
