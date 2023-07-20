import { memo } from 'react';

import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import postcardsLogo from '@assets/images/postcards-logo.png';

import { StyledAccordion, StyledAccordionSummary, StyledLogoBox } from './styled';
import navData from './helpers';
import SubMenuItem from './SubMenuItem';

const NavbarMenu = () => (
  <>
    <StyledLogoBox>
      <img src={postcardsLogo} alt="postcards Logo" />
    </StyledLogoBox>
    {navData.map(({ id, title, children }) => (
      <StyledAccordion key={id}>
        <StyledAccordionSummary
          expandIcon={children && <ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>{title}</Typography>
        </StyledAccordionSummary>
        {
          children && children.map((item) => (
            <SubMenuItem key={item.path} {...item} />
          ))
        }
      </StyledAccordion>
    ))}
  </>
);

export default memo(NavbarMenu);
