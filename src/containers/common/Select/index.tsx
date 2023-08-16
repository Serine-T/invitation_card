import { memo } from 'react';

import MenuItem from '@mui/material/MenuItem';
import { useFormContext } from 'react-hook-form';
import {
  SelectProps,
  SelectChangeEvent,
} from '@mui/material/Select';

import { StyledFormControl, StyledSelect } from './styled';
import { StyledInputBox, StyledInputLabel } from '../Input/styled';
import ErrorMessage from '../ErrorMessage';

// TODO: Check if it's correct

// TODO: ADD error handling
interface ISelectProps extends SelectProps {
  id: string;
  errors?: any;
  label?: string;
  options?: string[];
  width: string;
  name: string;
  errorMessage?: string;
  marginBottom?: number;
}

const Select = ({
  id,
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
          id={id}
          labelId={id}
          value={watch(name)}
          onChange={handleSelectChange}
          {...restProps}
        >
          {options &&
          options.length > 0 &&
          options.map((v) => <MenuItem key={v} value={v}>{v}</MenuItem>)}
        </StyledSelect>
      </StyledFormControl>
      {errorMessage && <ErrorMessage message={errorMessage} />}
    </StyledInputBox>
  );
};

export default memo(Select);
