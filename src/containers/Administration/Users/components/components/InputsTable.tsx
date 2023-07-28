import { memo } from 'react';

import TitlesWithBackButton from '@containers/common/TitlesWithBackButton';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Stack from '@mui/material/Stack';

import { AddUserSchema, IAddUserForm } from './helpers';

interface IInputsTable {
  title: string;
}

const InputsTable = ({ title }: IInputsTable) => {
  const methods = useForm<IAddUserForm>({
    resolver: yupResolver(AddUserSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = (data: IAddUserForm) => {
    console.log('data', data);
  };

  console.log('errors', errors);

  return (
    <>
      <TitlesWithBackButton title={title}>
        <FormProvider {...methods}>
          <Stack
            onSubmit={handleSubmit(onSubmit)}
            component="form"
          >
            erf
          </Stack>
        </FormProvider>
      </TitlesWithBackButton>
    </>
  );
};

export default memo(InputsTable);
