import { memo } from 'react';

import BaseInput, { IBaseInputProps } from '@containers/common/Input/index';
import { useFormContext } from 'react-hook-form';

const EmailInput = (props: IBaseInputProps) => {
  const { register } = useFormContext();

  return (
    <BaseInput
      {...props}
      label="E-mail"
      placeholder="Enter Email"
      autoComplete="email"
      marginBottom={24}
      {...register('email')}
    />
  );
};

export default memo(EmailInput);
