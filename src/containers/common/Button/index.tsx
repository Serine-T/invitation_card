import { memo, ReactNode } from 'react';

import MuiButton, { ButtonProps } from '@mui/material/Button';

import { StyledButton, StyledCircularProgress } from './styled';

interface IButtonProps extends Omit<ButtonProps, 'title'> {
  title?: ReactNode;
  width?: string | number;
  isOutlined?: boolean;
  isLoading?: boolean;
}

const Button = ({
  width,
  color,
  variant,
  children,
  title,
  isOutlined,
  isLoading,
  ...restProps
}: IButtonProps) => {
  if (color && variant) {
    return (
      <MuiButton color={color} variant={variant} {...restProps}>
        {children || title}
      </MuiButton>
    );
  }

  return (
    <StyledButton
      disableRipple
      width={width}
      isOutlined={isOutlined}
      isLoading={isLoading}
      {...restProps}
    >
      {isLoading ? <StyledCircularProgress size={18} /> : (children || title)}
    </StyledButton>
  );
};

export default memo(Button);
