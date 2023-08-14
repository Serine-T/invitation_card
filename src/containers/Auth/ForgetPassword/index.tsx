import { memo } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@containers/common/Button';
import { useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import PAGE_ROUTES from '@routes/routingEnum';
import { useAppDispatch, useAppSelector } from '@features/app/hooks';
import { forgetPassword } from '@features/auth/actions';
import { selectAuth } from '@features/auth/selectors';

import AuthComponent from '..';
import { StyledInputBox, StyledTitle } from '../styled';
import EmailInput from '../components/Email';
import { ForgetPasswordSchema, IForgetPasswordForm } from './helpers';

const ForgetPassword = () => {
  const { isLoading } = useAppSelector(selectAuth);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const methods = useForm<IForgetPasswordForm>({
    resolver: yupResolver(ForgetPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const {
    handleSubmit,
    formState: { errors },
    setError,
  } = methods;

  const onSubmit = async (data: IForgetPasswordForm) => {
    await dispatch(forgetPassword(data)).unwrap().then(() => {
      navigate(PAGE_ROUTES.RESEND_PASSWORD, { state: { data } });
    }).catch((e) => setError('email', { message: e.message }));
  };

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
              disabled={isLoading}
              isLoading={isLoading}
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
