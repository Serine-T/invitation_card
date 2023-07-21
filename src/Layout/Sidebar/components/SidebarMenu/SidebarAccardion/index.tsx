import { memo, useState } from 'react';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useLocation } from 'react-router-dom';

import { StyledAccordion, StyledAccordionDetails, StyledAccordionSummary } from './styled';
import MenuItem from '../MenuItem';
import SubMenuItem from '../SubMenu';
import { INavBarItem } from '../helpers';

const SidebarAccordion = ({ title, children, path }: INavBarItem) => {
  const { pathname } = useLocation();
  const [isExpanded, setIsExpanded] = useState(pathname.startsWith(path));

  const handleAccordionChange = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <StyledAccordion expanded={isExpanded} onChange={handleAccordionChange}>
      <StyledAccordionSummary
        expandIcon={children && <ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <MenuItem title={title} path={path} hasChild={!!children} />
      </StyledAccordionSummary>
      {children &&
        children.map((item) => (
          <StyledAccordionDetails key={item.path}>
            <SubMenuItem {...item} />
          </StyledAccordionDetails>
        ))}
    </StyledAccordion>
  );
};

export default memo(SidebarAccordion);
