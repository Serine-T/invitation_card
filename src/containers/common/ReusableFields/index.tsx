import { memo } from 'react';

import { InputTypes, ValidFieldNames } from '@utils/types';
import { useFormContext } from 'react-hook-form';

import Input from '../Input';
import Textarea from '../Textarea';
import Checkbox from '../Checkbox';

interface IReusableFields extends ValidFieldNames{}

function ReusableFields({ field, type, label }: IReusableFields) {
  const { formState: { errors }, register } = useFormContext();

  if (type === InputTypes.text) {
    return (
      <Input
        placeholder={label}
        {...register(field as string)}
        errorMessage={errors?.[field]?.message as string}
      />
    );
  }

  if (type === InputTypes.textarea) {
    return (
      <Textarea
        errorMessage={errors?.[field]?.message as string}
        placeholder={label}
        {...register(field as string)}
      />
    );
  }

  if (type === InputTypes.checkbox) {
    return <Checkbox name={field as string} />;
  }

  return null;
}

export default memo(ReusableFields);
