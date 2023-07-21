import { memo } from 'react';

import { Link, useLocation } from 'react-router-dom';

import { StyldMenuItem } from './styled';

interface IMenuItem {
  path: string;
  title: string;
  hasChild: boolean;
}

const MenuItem = ({ hasChild, path, title }: IMenuItem) => {
  const { pathname } = useLocation();
  const isActive = pathname.startsWith(path);

  return hasChild ? (
    <StyldMenuItem isActive={isActive}>
      {title}
    </StyldMenuItem>
  )
    : (
      <Link to={path}>
        <StyldMenuItem isActive={isActive}>
          {title}
        </StyldMenuItem>
      </Link>
    );
};

export default memo(MenuItem);
