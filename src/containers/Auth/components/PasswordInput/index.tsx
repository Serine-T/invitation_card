import { memo, useCallback, useState } from 'react';

import BaseInput, { IBaseInputProps } from '@containers/common/Input/index';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useFormContext } from 'react-hook-form';

import { StyledIconButton, StyledInputAdornment } from './styled';

const PasswordInput = (props: IBaseInputProps) => {
  const { disabled, name = 'password' } = props;
  const { register } = useFormContext();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = useCallback(() => setShowPassword((prev) => !prev), []);

  return (
    <BaseInput
      {...props}
      type={showPassword ? 'text' : 'password'}
      marginBottom={24}
      autoComplete={name}
      {...register(name)}
      endAdornment={(
        <StyledInputAdornment position="end">
          <StyledIconButton
            onClick={handleClickShowPassword}
            disabled={disabled}
          >
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </StyledIconButton>
        </StyledInputAdornment>
            )}
    />

  );
};

export default memo(PasswordInput);
