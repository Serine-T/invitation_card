import { forwardRef, memo, ReactNode } from 'react';

import { InputBaseProps } from '@mui/material/InputBase';

import {
  StyledBaseInput,
  StyledFormControl,
  StyledInputBox,
  StyledInputLabel,
} from './styled';
import StyledTypography from '../StyledTypography';

export interface IBaseInputProps extends InputBaseProps {
  label?: string | ReactNode;
  accept?: string;
  inputBoxTitle?: string;
  calculateInputWidth?: boolean;
  customMessageText?: ReactNode;
  withStyledInputBox?: boolean;
  errorMessage?: string;
  marginBottom?: number;
}

const BaseInput = forwardRef((props: IBaseInputProps, ref) => {
  const {
    id,
    label,
    accept,
    inputBoxTitle,
    customMessageText,
    withStyledInputBox,
    calculateInputWidth = false,
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
          sx={calculateInputWidth ? {
            input: {
              width: `${`${restProps.value || 1}`.length || 1}ch`,
            },
            ...sx,
          } : sx}
          {...restProps}
        />
      </StyledFormControl>
      {!!errorMessage && (
        <StyledTypography variant="body4" color="red" mt="6px">
          {errorMessage}
        </StyledTypography>
      )}
    </StyledInputBox>
  );
});

export default memo(BaseInput);
