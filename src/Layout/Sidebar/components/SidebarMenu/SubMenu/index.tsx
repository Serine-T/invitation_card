import { memo } from 'react';

import { Link, useLocation } from 'react-router-dom';
import StyledTypography from '@containers/common/StyledTypography';

interface ISubMenuItem {
  path: string;
  title: string;
}

const SubMenuItem = ({ path, title }: ISubMenuItem) => {
  const { pathname } = useLocation();
  const isActive = pathname === path || pathname.startsWith(path);

  return (
    <Link to={path}>
      <StyledTypography variant="body3" color={isActive ? 'blue' : ''}>
        {title}
      </StyledTypography>

    </Link>

  );
};

export default memo(SubMenuItem);
