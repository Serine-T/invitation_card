import { memo, useEffect } from 'react';

import { useFormContext } from 'react-hook-form';
import { InputBaseProps } from '@mui/material/InputBase';
import InputLabel from '@mui/material/InputLabel';
import toHex from 'colornames';

import { StyledColorPickerContent, StyledInput, StyledInputBox } from './styled';
import Input from '../Input';
import ErrorMessage from '../ErrorMessage';

interface IUploadProps {
  id: string;
  label?: string;
  inputProps?: InputBaseProps;
  errorMessage?: string;
  name: string;
}

const ColorPickerInput = ({ id, label, errorMessage, inputProps, name }: IUploadProps) => {
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
    <>
      {label && <InputLabel shrink htmlFor={id}>{label}</InputLabel>}
      <StyledColorPickerContent>
        <StyledInputBox>
          <StyledInput
            id={id}
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
        />
      </StyledColorPickerContent>
      {errorMessage && <ErrorMessage message={errorMessage} />}
    </>
  );
};

export default memo(ColorPickerInput);
