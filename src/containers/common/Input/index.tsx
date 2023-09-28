import { forwardRef, memo, ReactNode } from 'react';

import { InputBaseProps } from '@mui/material/InputBase';

import {
  StyledBaseInput,
  StyledFormControl,
  StyledInputBox,
  StyledInputLabel,
} from './styled';
import ErrorMessage from '../ErrorMessage';

export interface IBaseInputProps extends InputBaseProps {
  label?: string | ReactNode;
  width?: string;
  errorMessage?: string;
  marginBottom?: number;
  showError?: boolean;
}

const BaseInput = forwardRef(({
  id,
  label,
  inputProps,
  sx,
  width,
  marginBottom,
  errorMessage,
  showError,
  ...restProps
}: IBaseInputProps, ref) => (
  <StyledInputBox marginBottom={marginBottom} errorMessage={!!errorMessage}>
    {label && (
    <StyledInputLabel shrink htmlFor={id}>
      {label}
    </StyledInputLabel>
    )}
    <StyledFormControl width={width} variant="standard" error={!!errorMessage || showError}>
      <StyledBaseInput
        inputRef={ref}
        inputProps={inputProps}
        sx={sx}
        {...restProps}
      />
    </StyledFormControl>
    {!!errorMessage && (
    <ErrorMessage message={errorMessage} />
    )}
  </StyledInputBox>
));

export default memo(BaseInput);
