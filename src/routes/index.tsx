import { useLocation, useNavigate, useRoutes } from 'react-router-dom';
import { useAppSelector } from '@features/app/hooks';
import { selectIsAuth } from '@features/auth/selectors';
import useMount from '@customHooks/useMount';
import { PAGE_ROUTES } from '@customTypes/enums/routes';

import { routingArray } from './routingArray';
import { hasValueEqualTo } from './helpers';

const Router = () => {
  const { isAuth } = useAppSelector(selectIsAuth);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useMount(() => {
    if (!isAuth && hasValueEqualTo(pathname)) {
      navigate(PAGE_ROUTES.SIGN_IN);
    }
  });

  return useRoutes(isAuth ? routingArray : routingArray.filter((path) => path.isPublic));
};

export default Router;
