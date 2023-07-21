import { memo } from 'react';

import { Link, useLocation } from 'react-router-dom';

import { StyldSubMenuItem } from './styled';

interface ISubMenuItem {
  path: string;
  title: string;
}

const SubMenuItem = ({ path, title }: ISubMenuItem) => {
  const { pathname } = useLocation();

  return (
    <Link to={path}>
      <StyldSubMenuItem isActive={pathname === path}>
        {title}
      </StyldSubMenuItem>
    </Link>

  );
};

export default memo(SubMenuItem);
