import { memo, useCallback } from 'react';

import { FormProvider, useForm } from 'react-hook-form';
import Button from '@containers/common/Button';
import { useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { yupResolver } from '@hookform/resolvers/yup';
import { signIn } from '@features/auth/actions';
import { useAppDispatch, useAppSelector } from '@features/app/hooks';
import { selectIsAuth } from '@features/auth/selectors';
import Loader from '@containers/common/Loader';
import { PAGE_ROUTES } from '@routes/routingEnum';

import EmailInput from '../components/Email';
import AuthComponent from '..';
import { StyledForgetBox, StyledForgetText, StyledInputBox, StyledTitle } from '../styled';
import PasswordInput from '../components/PasswordInput';
import { ISignInForm, SignInSchema } from './helpers';

const SignIn = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading } = useAppSelector(selectIsAuth);
  const handleForgetPass = useCallback(() => navigate(PAGE_ROUTES.FORGET_PASSWORD), [navigate]);
  const methods = useForm<ISignInForm>({
    resolver: yupResolver(SignInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const {
    handleSubmit,
    formState: { errors },
    setError,
  } = methods;

  const onSubmit = useCallback(async (data: ISignInForm) => {
    await dispatch(signIn(data)).unwrap().then(() => {
      navigate(PAGE_ROUTES.DASHBOARD);
    }).catch((e) => setError('password', { message: e.message }));
  }, [dispatch, navigate, setError]);

  return (
    <>
      {isLoading && <Loader />}
      <AuthComponent>
        <StyledTitle variant="h5">
          Log in
        </StyledTitle>
        <FormProvider {...methods}>
          <Stack
            onSubmit={handleSubmit(onSubmit)}
            component="form"
          >
            <EmailInput
              error={!!errors.email?.message}
              errorMessage={errors.email?.message}
            />
            <PasswordInput
              name="password"
              label="Password"
              placeholder="Enter Password"
              error={!!errors.password?.message}
              errorMessage={errors.password?.message}
            />
            <StyledInputBox>
              <Button
                type="submit"
              >
                Log in
              </Button>
            </StyledInputBox>
          </Stack>
        </FormProvider>
        <StyledForgetBox>
          <Box display="inline">
            Forgot password?
            <StyledForgetText
              variant="h10"
              display="inline"
              color="blue"
              onClick={handleForgetPass}
            >
              Click here
            </StyledForgetText>
          </Box>
        </StyledForgetBox>
      </AuthComponent>
    </>
  );
};

export default memo(SignIn);
