import { memo } from 'react';

import { Link } from 'react-router-dom';

import { StyledAccordionDetails } from './styled';

interface ISubMenuItem {
  path: string;
  title: string;
}

const SubMenuItem = ({ path, title }: ISubMenuItem) => (
  <StyledAccordionDetails>
    <Link to={path}>
      {title}
    </Link>
  </StyledAccordionDetails>

);

export default memo(SubMenuItem);
