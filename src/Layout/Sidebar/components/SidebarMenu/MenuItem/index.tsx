import { memo, useMemo } from 'react';

import { Link } from 'react-router-dom';
import StyledTypography from '@containers/common/StyledTypography';

interface IMenuItem {
  path: string;
  title: string;
  hasChild: boolean;
  isActive: boolean;
}

const MenuItem = ({ hasChild, path, title, isActive }: IMenuItem) => {
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
