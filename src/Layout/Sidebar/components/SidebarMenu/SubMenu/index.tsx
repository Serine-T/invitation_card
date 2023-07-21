import { memo } from 'react';

import { Link, useLocation } from 'react-router-dom';
import StyledTypography from '@containers/common/StyledTypography';

interface ISubMenuItem {
  path: string;
  title: string;
}

const SubMenuItem = ({ path, title }: ISubMenuItem) => {
  const { pathname } = useLocation();

  return (
    <Link to={path}>
      <StyledTypography color={pathname === path ? 'blue' : ''}>
        {title}
      </StyledTypography>

    </Link>

  );
};

export default memo(SubMenuItem);
