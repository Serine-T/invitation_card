import { memo } from 'react';

import MenuItem from '@mui/material/MenuItem';
import { useFormContext } from 'react-hook-form';
import {
  SelectProps,
  SelectChangeEvent,
} from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import { SelectOptions } from '@utils/types';

import { StyledFormControl, StyledSelect } from './styled';
import { StyledInputBox, StyledInputLabel } from '../Input/styled';
import ErrorMessage from '../ErrorMessage';

interface ISelectProps extends SelectProps {
  errors?: any;
  label?: string;
  options?: SelectOptions[];
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
            options.map(({ optionName, value }) => (
              <MenuItem key={value} value={value}>
                <Typography variant="body3">{optionName}</Typography>
              </MenuItem>
            ))}
        </StyledSelect>
      </StyledFormControl>
      {errorMessage && <ErrorMessage message={errorMessage} />}
    </StyledInputBox>
  );
};

export default memo(Select);
