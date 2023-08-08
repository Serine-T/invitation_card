import { FC, memo } from 'react';

import { TypographyProps } from '@mui/material/Typography';

import StyledTypography from '../StyledTypography';

interface IErrorMessageProps extends TypographyProps {
  message?: string;
}

const ErrorMessage: FC<IErrorMessageProps> = ({
  message,
}) => (
  <StyledTypography variant="body4" color="red" mt="6px">
    {message}
  </StyledTypography>
);

export default memo(ErrorMessage);
