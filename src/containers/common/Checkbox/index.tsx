import { ChangeEvent } from 'react';

import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useFormContext } from 'react-hook-form';

interface ICheckbox {
  name: string;
  label?: string;
}

const StyledCheckbox = ({ name, label }:ICheckbox) => {
  const { setValue, watch } = useFormContext();

  const handleCheckboxChange = (event:ChangeEvent<HTMLInputElement>) => {
    setValue(name, event.target.checked);
  };

  return (
    <FormControlLabel
      control={(
        <Checkbox
          disableRipple
          checked={watch(name)}
          onChange={handleCheckboxChange}
        />
)}
      label={label ?? label}
    />
  );
};

export default StyledCheckbox;
