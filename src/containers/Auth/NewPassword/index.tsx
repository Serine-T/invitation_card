import { memo, useCallback } from 'react';

import Button from '@containers/common/Button';
import { FormProvider, useForm } from 'react-hook-form';
import Stack from '@mui/material/Stack';
import { yupResolver } from '@hookform/resolvers/yup';

import AuthComponent from '..';
import { StyledInputBox, StyledTitle } from '../styled';
import PasswordInput from '../components/PasswordInput';
import { INewPasswordForm, NewPasswordSchema } from './helpers';

const NewPassword = () => {
  const methods = useForm<INewPasswordForm>({
    resolver: yupResolver(NewPasswordSchema),
    defaultValues: {
      newPassword: '',
      conformPassword: '',
    },
  });

  const {
    handleSubmit,
    formState: { errors },
    watch,
  } = methods;

  console.log('aaa***', watch());

  console.log('errr', errors);

  const onSubmit = useCallback((data: INewPasswordForm) => {
    console.log('data', data);
  }, []);

  return (
    <AuthComponent>
      <StyledTitle variant="h5">
        New Password
      </StyledTitle>
      <FormProvider {...methods}>
        <Stack
          onSubmit={handleSubmit(onSubmit)}
          component="form"
        >
          <PasswordInput
            name="newPassword"
            label="New Password"
            placeholder="Enter Password"
            error={!!errors.newPassword?.message}
            errorMessage={errors.newPassword?.message}
          />
          <PasswordInput
            name="conformPassword"
            label="Confirm Password"
            placeholder="Enter Password"
            error={!!errors.conformPassword?.message}
            errorMessage={errors.conformPassword?.message}
          />
          <StyledInputBox>
            <Button
              type="submit"
            >
              Confirm
            </Button>
          </StyledInputBox>
        </Stack>
      </FormProvider>
    </AuthComponent>
  );
};

export default memo(NewPassword);
