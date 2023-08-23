import { memo } from 'react';

import { useFormContext } from 'react-hook-form';
import {
  SelectProps,
  SelectChangeEvent,
} from '@mui/material/Select';
import Typography from '@mui/material/Typography';

import { StyledFormControl, StyledMenuItem, StyledSelect } from './styled';
import { StyledInputBox, StyledInputLabel } from '../Input/styled';
import ErrorMessage from '../ErrorMessage';

// TODO: ADD error handling
interface ISelectProps extends SelectProps {
  errors?: any;
  label?: string;
  options?: string[];
  width?: string;
  name: string;
  errorMessage?: string;
  marginBottom?: number;
}

const Select = ({
  name,
  label,
  errors,
  options,
  width,
  errorMessage,
  marginBottom,
  ...restProps
}: ISelectProps) => {
  const { watch, setValue } = useFormContext();
  const handleSelectChange = (e: SelectChangeEvent<unknown>) => {
    if (name) {
      setValue(name, e.target.value);
    }
  };

  return (
    <StyledInputBox marginBottom={marginBottom} errorMessage={!!errorMessage}>
      { label && <StyledInputLabel shrink>{label}</StyledInputLabel>}
      <StyledFormControl width={width} error={!!errorMessage}>
        <StyledSelect
          id={name}
          labelId={name}
          value={watch(name)}
          onChange={handleSelectChange}
          {...restProps}
        >
          {options &&
          options.length > 0 &&
            options.map((v) => (
              <StyledMenuItem key={v} value={v}>
                <Typography variant="body3">{v}</Typography>
              </StyledMenuItem>
            ))}
        </StyledSelect>
      </StyledFormControl>
      {errorMessage && <ErrorMessage message={errorMessage} />}
    </StyledInputBox>
  );
};

export default memo(Select);
