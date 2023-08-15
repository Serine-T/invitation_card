import { memo } from 'react';

import Button from '@containers/common/Button';
import { FormProvider, useForm } from 'react-hook-form';
import Stack from '@mui/material/Stack';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate, useParams } from 'react-router-dom';
import { resetPassword } from '@features/auth/actions';
import { useAppDispatch, useAppSelector } from '@features/app/hooks';
import PAGE_ROUTES from '@routes/routingEnum';
import { selectAuth } from '@features/auth/selectors';

import AuthComponent from '..';
import { StyledInputBox, StyledTitle } from '../styled';
import PasswordInput from '../components/PasswordInput';
import { INewPasswordForm, NewPasswordSchema } from './helpers';
import FailPage from '../FailPage';

const NewPassword = () => {
  const { isLoading, errorMessage } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();
  const { token } = useParams();
  const navigate = useNavigate();

  const methods = useForm<INewPasswordForm>({
    resolver: yupResolver(NewPasswordSchema),
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
  });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  // TODO: Auth finish

  const onSubmit = async (body: INewPasswordForm) => {
    if (token) {
      await dispatch(resetPassword({ token, body })).unwrap().then(() => {
        navigate(PAGE_ROUTES.SIGN_IN);
      }).catch(() => { });
    }
  };

  return errorMessage ? <FailPage /> : (
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
            name="confirmPassword"
            label="Confirm Password"
            placeholder="Enter Password"
            error={!!errors.confirmPassword?.message}
            errorMessage={errors.confirmPassword?.message}
          />
          <StyledInputBox>
            <Button
              type="submit"
              disabled={isLoading}
              isLoading={isLoading}
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
