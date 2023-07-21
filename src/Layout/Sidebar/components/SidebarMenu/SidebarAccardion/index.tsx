import { memo, useState } from 'react';

import { useLocation } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { StyledAccordion, StyledAccordionDetails, StyledAccordionSummary } from './styled';
import MenuItem from '../MenuItem';
import SubMenuItem from '../SubMenu';
import { INavBarItem } from '../helpers';

const SidebarAccordion = ({ title, children, path }: INavBarItem) => {
  const { pathname } = useLocation();
  const isActive = pathname.startsWith(path);
  const [isExpanded, setIsExpanded] = useState(isActive);

  const handleAccordionChange = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <StyledAccordion expanded={isExpanded} onChange={handleAccordionChange}>
      <StyledAccordionSummary
        isActive={isActive}
        expandIcon={children && <ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <MenuItem
          title={title}
          path={path}
          hasChild={!!children}
          isActive={isActive}
        />
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
