import { memo } from 'react';

import { Link } from 'react-router-dom';
import StyledTypography from '@containers/common/StyledTypography';

interface IMenuItem {
  path: string;
  title: string;
  hasChild: boolean;
  isActive: boolean;
}

const MenuItem = ({ hasChild, path, title, isActive }: IMenuItem) => (hasChild ? (
  <StyledTypography variant="subtitle3" color={isActive ? 'blue' : 'grey'}>
    {title}
  </StyledTypography>
)
  : (
    <Link to={path}>
      <StyledTypography variant="subtitle3" color={isActive ? 'blue' : 'grey'}>
        {title}
      </StyledTypography>
    </Link>
  ));

export default memo(MenuItem);
