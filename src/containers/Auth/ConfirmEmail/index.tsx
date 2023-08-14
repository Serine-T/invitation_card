import Loader from '@containers/common/Loader';
import useMount from '@customHooks/useMount';
import { useAppDispatch, useAppSelector } from '@features/app/hooks';
import { confirmEmail } from '@features/auth/actions';
import { selectAuth } from '@features/auth/selectors';
import { useParams } from 'react-router-dom';

const ConfirmEmail = () => {
  const { token } = useParams();
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector(selectAuth);

  useMount(() => {
    if (token) {
      dispatch(confirmEmail(token));
    }
  });

  return (
    <>
      {isLoading ? <Loader isLayout={false} /> : <>Something went wrong</>}
    </>
  );
};

export default ConfirmEmail;
