import { ChangeEvent } from 'react';

import { useFormContext } from 'react-hook-form';
import Stack from '@mui/material/Stack';

import ErrorMessage from '../ErrorMessage';
import { StyledCheckbox, StyledFormControlLabel } from './styles';

interface ICheckbox {
  name: string;
  label?: string;
  errorMessage?: string;
}

const Checkbox = ({ name, label, errorMessage }:ICheckbox) => {
  const { setValue, watch } = useFormContext();

  const handleCheckboxChange = (event:ChangeEvent<HTMLInputElement>) => {
    setValue(name, event.target.checked);
  };

  return (
    <Stack>
      <StyledFormControlLabel
        control={(
          <StyledCheckbox
            disableRipple
            checked={watch(name)}
            onChange={handleCheckboxChange}
            sx={{ padding: '0' }}
          />
)}
        label={label ?? label}
      />
      {!!errorMessage && <ErrorMessage message={errorMessage} />}
    </Stack>

  );
};

export default Checkbox;
