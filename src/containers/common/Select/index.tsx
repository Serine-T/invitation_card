import { memo, ReactNode } from 'react';

import InputLabel from '@mui/material/InputLabel';
import {
  SelectProps,
  SelectChangeEvent,
} from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { UseFormSetValue } from 'react-hook-form';

import { StyledFormControl, StyledSelect } from './styled';
// TODO: Check if it's correct

// TODO: ADD error handling
interface ISelectProps extends SelectProps {
  id: string;
  errors?: any;
  value: string;
  label?: string;
  options?: string[];
  customMessageText?: ReactNode;
  setValue?: UseFormSetValue<any>;
}

const Select = ({
  id,
  name,
  value,
  label,
  errors,
  options,
  setValue,
  onChange,
  customMessageText,
  ...restProps
}: ISelectProps) => {
  const handleSelectChange = (event: SelectChangeEvent<unknown>) => {
    const { value: targetValue } = event.target;

    if (name) {
      setValue?.(name, targetValue);
    }
  };

  return (
    <StyledFormControl>
      <InputLabel>{label}</InputLabel>
      <StyledSelect
        id={id}
        labelId={id}
        label={label}
        value={value}
        onChange={handleSelectChange}
        {...restProps}
      >
        {options &&
          options.length > 0 &&
          options.map((v) => <MenuItem key={v} value={v}>{v}</MenuItem>)}
      </StyledSelect>
    </StyledFormControl>
  );
};

export default memo(Select);
