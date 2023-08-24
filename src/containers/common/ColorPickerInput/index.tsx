import { memo, useEffect } from 'react';

import { useFormContext } from 'react-hook-form';
import { InputBaseProps } from '@mui/material/InputBase';
import InputLabel from '@mui/material/InputLabel';
import toHex from 'colornames';
import Box from '@mui/material/Box';

import { StyledColorPickerContent, StyledInput, StyledInputBox } from './styled';
import Input from '../Input';

interface IUploadProps {
  label?: string;
  inputProps?: InputBaseProps;
  errorMessage?: string;
  name: string;
}

const ColorPickerInput = ({ label, errorMessage, inputProps, name }: IUploadProps) => {
  const { setValue, watch, register } = useFormContext();
  const filledColorValue = watch(name);

  const updateColorValue = (color: string) => {
    setValue(name, color);
    if (inputProps?.name) {
      setValue(inputProps.name, color);
    }
  };

  const onInputChange: InputBaseProps['onChange'] = (e) => {
    updateColorValue(e.target.value);
  };

  useEffect(() => {
    const color = toHex(filledColorValue);

    if (color) {
      updateColorValue(color);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filledColorValue]);

  return (
    <Box>
      {label && <InputLabel shrink htmlFor={name}>{label}</InputLabel>}
      <StyledColorPickerContent error={!!errorMessage}>
        <StyledInputBox>
          <StyledInput
            id={name}
            type="color"
            {...register(name, {
              onChange: onInputChange,
            })}
          />
        </StyledInputBox>
        <Input
          type="text"
          placeholder="Color"
          {...register(name, {
            onChange: onInputChange,
          })}
          {...inputProps}
          errorMessage={errorMessage}
        />
      </StyledColorPickerContent>
    </Box>
  );
};

export default memo(ColorPickerInput);
