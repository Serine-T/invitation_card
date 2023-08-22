import { ForwardedRef, forwardRef, memo } from 'react';

import { TextareaAutosizeProps } from '@mui/material/TextareaAutosize';

import { StyledFormControl, StyledTextareaAutosize } from './styled';
import ErrorMessage from '../ErrorMessage';
import { StyledInputLabel } from '../Input/styled';

interface ITextareaProps extends TextareaAutosizeProps {
  label?: string;
  errorMessage?: string;
}

const Textarea = forwardRef(({
  label = '',
  errorMessage,
  ...restProps
}: ITextareaProps, ref: ForwardedRef<HTMLTextAreaElement>) => {
  return (
    <>
      {!!label && (
      <StyledInputLabel htmlFor={label} shrink>{label}</StyledInputLabel>
      )}
      <StyledFormControl variant="standard">
        <StyledTextareaAutosize
          ref={ref}
          id={label}
          aria-label="textarea"
          minRows={4.6}
          error={!!errorMessage}
          {...restProps}
        />
      </StyledFormControl>

      {errorMessage && <ErrorMessage message={errorMessage} />}
    </>
  );
});

export default memo(Textarea);
