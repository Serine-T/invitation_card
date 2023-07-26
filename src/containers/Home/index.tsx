import { memo } from 'react';

import { useAppSelector } from '@features/app/hooks';
import { selectIsAuth } from '@features/auth/selectors';
import { useNavigate } from 'react-router-dom';
import { PAGE_ROUTES } from '@customTypes/enums/routes';
import useMount from '@customHooks/useMount';

const Home = () => {
  const navigate = useNavigate();
  const { isAuth } = useAppSelector(selectIsAuth);

  useMount(() => {
    navigate(isAuth ? PAGE_ROUTES.DASHBOARD : PAGE_ROUTES.SIGN_IN);
  });

  return <></>;
};

export default memo(Home);
