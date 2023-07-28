import { memo, useCallback } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@containers/common/Button';
import { useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import PAGE_ROUTES from '@routes/routingEnum';

import AuthComponent from '..';
import { StyledInputBox, StyledTitle } from '../styled';
import EmailInput from '../components/Email';
import { ForgetPasswordSchema, IForgetPasswordForm } from './helpers';

const ForgetPassword = () => {
  const navigate = useNavigate();
  const methods = useForm<IForgetPasswordForm>({
    resolver: yupResolver(ForgetPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = useCallback((data: IForgetPasswordForm) => {
    console.log('data', data);

    navigate(PAGE_ROUTES.RESEND_PASSWORD);
  }, [navigate]);

  return (
    <AuthComponent>
      <StyledTitle variant="h5">
        Reset password
      </StyledTitle>
      <FormProvider {...methods}>
        <Stack
          onSubmit={handleSubmit(onSubmit)}
          component="form"
        >
          <StyledInputBox>
            <Typography variant="body2">
              Enter your e-mail address
              to reset your password
            </Typography>

          </StyledInputBox>
          <EmailInput
            error={!!errors.email?.message}
            errorMessage={errors.email?.message}
          />
          <StyledInputBox>
            <Button
              type="submit"
            >
              Send
            </Button>
          </StyledInputBox>
        </Stack>
      </FormProvider>
    </AuthComponent>
  );
};

export default memo(ForgetPassword);
