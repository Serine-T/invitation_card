import some from 'lodash/some';
import find from 'lodash/find';

import { CustomRouteObject, routingArray } from './routingArray';

const hasValueInChildren = (routes: CustomRouteObject[], pathname: string): boolean => {
  return some(routes, (route) => {
    if (route.path === pathname && !route.isPublic) {
      return true;
    }

    if (route.children) {
      return hasValueInChildren(route.children, pathname);
    }

    return false;
  });
};

export const hasValueEqualTo = (pathname: string): boolean => {
  const foundRoute = find(routingArray, { path: pathname, isPublic: false });

  if (foundRoute) {
    return true;
  }

  return Boolean(hasValueInChildren(routingArray, pathname));
};
