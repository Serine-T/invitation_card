import { useRoutes } from 'react-router-dom';
import { useAppSelector } from '@features/app/hooks';
import { selectIsAuth } from '@features/auth/selectors';

import { routingArray } from './routingArray';

const Router = () => {
  const { isAuth } = useAppSelector(selectIsAuth);

  console.log('isAuth', isAuth);

  return useRoutes(isAuth ? routingArray : routingArray.filter((path) => path.isPublic));
};

export default Router;
