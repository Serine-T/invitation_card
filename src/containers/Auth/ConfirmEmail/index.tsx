import Loader from '@containers/common/Loader';
import useMount from '@customHooks/useMount';
import { useAppDispatch, useAppSelector } from '@features/app/hooks';
import { confirmEmail } from '@features/auth/actions';
import { selectAuth } from '@features/auth/selectors';
import PAGE_ROUTES from '@routes/routingEnum';
import { useNavigate, useParams } from 'react-router-dom';

import FailPage from '../FailPage';

const ConfirmEmail = () => {
  const { token } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading, errorMessage } = useAppSelector(selectAuth);

  useMount(() => {
    if (token) {
      dispatch(confirmEmail(token)).unwrap().then(() => {
        navigate(PAGE_ROUTES.HOME);
      }).catch(() => {});
    }
  });

  return (
    <>
      {isLoading ? <Loader isLayout={false} /> : (errorMessage && <FailPage />)}
    </>
  );
};

export default ConfirmEmail;
