import { memo, useMemo } from 'react';

import { Link, useLocation } from 'react-router-dom';
import StyledTypography from '@containers/common/StyledTypography';

interface IMenuItem {
  path: string;
  title: string;
  hasChild: boolean;
}

const MenuItem = ({ hasChild, path, title }: IMenuItem) => {
  const { pathname } = useLocation();
  const isActive = pathname.startsWith(path);

  const styledMenuItem = useMemo(() => (
    <StyledTypography variant="subtitle3" color={isActive ? 'blue' : 'grey'}>
      {title}
    </StyledTypography>
  ), [title, isActive]);

  return hasChild ? styledMenuItem
    : (
      <Link to={path}>
        {styledMenuItem}
      </Link>
    );
};

export default memo(MenuItem);
