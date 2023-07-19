import { forwardRef, memo, ReactNode } from 'react';

import { InputBaseProps } from '@mui/material/InputBase';
import Box from '@mui/material/Box';

import {
  StyledBaseInput,
  StyledErrorMessage,
  StyledFormControl,
  StyledInputBox,
  StyledInputLabel,
} from './styled';
import ErrorMessage from '../ErrorMessage';

export interface IBaseInputProps extends InputBaseProps {
  label?: string | ReactNode;
  accept?: string;
  inputBoxTitle?: string;
  calculateInputWidth?: boolean;
  customMessageText?: ReactNode;
  withStyledInputBox?: boolean;
  error?: boolean;
  errorMessage?: string;
  marginBottom?: number;
}

const BaseInput = forwardRef((props: IBaseInputProps, ref) => {
  const {
    id,
    label,
    accept,
    error = false,
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

  const renderInputContent = () => (
    <StyledInputBox marginBottom={marginBottom} errorMessage={!!errorMessage}>
      {label && (
        <StyledInputLabel shrink htmlFor={id}>
          {label}
        </StyledInputLabel>
      )}
      <StyledFormControl variant="standard" error={error}>
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

      {/* TODO: text  */}
      {!!errorMessage && (
        <StyledErrorMessage>
          {errorMessage}
        </StyledErrorMessage>
      )}
    </StyledInputBox>
  );

  return (

    <Box>
      {renderInputContent()}
      {error && inputProps?.name && (
      <ErrorMessage
        errors={error}
        name={inputProps.name}
      />
      )}
    </Box>
  );
});

export default memo(BaseInput);
