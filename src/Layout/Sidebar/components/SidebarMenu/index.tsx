import React, { memo, useState } from 'react';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useLocation } from 'react-router-dom';

import navData from './helpers';
import { StyledAccordion, StyledAccordionSummary, StyledAccordionDetails } from './styled';
import MenuItem from './MenuItem';
import SubMenuItem from './SubMenu';

const SidebarMenu = () => {
  const { pathname } = useLocation();

  const selectedPath = navData.find(({ path }) => pathname.startsWith(path));
  const initialValue = selectedPath?.path || false;
  const [expanded, setExpanded] = useState<string | false>(initialValue);

  const handleChange =
    (path: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? path : false);
    };

  return (
    <>
      {
        navData.map(({ path, title, children }) => {
          const isActive = pathname.startsWith(path);

          return (
            <StyledAccordion key={path} expanded={expanded === path} onChange={handleChange(path)}>
              <StyledAccordionSummary
                isActive={isActive}
                expandIcon={children && <ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id={path}
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
        })
      }
    </>
  );
};

export default memo(SidebarMenu);
