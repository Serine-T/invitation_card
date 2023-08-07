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
  calculateInputWidth?: boolean;
  errorMessage?: string;
  marginBottom?: number;
}

const BaseInput = forwardRef((props: IBaseInputProps, ref) => {
  const {
    id,
    label,
    inputProps,
    sx,
    marginBottom,
    errorMessage,
    ...restProps
  } = props;

  return (
    <StyledInputBox marginBottom={marginBottom} errorMessage={!!errorMessage}>
      {label && (
        <StyledInputLabel shrink htmlFor={id}>
          {label}
        </StyledInputLabel>
      )}
      <StyledFormControl variant="standard" error={!!errorMessage}>
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
  );
});

export default memo(BaseInput);
