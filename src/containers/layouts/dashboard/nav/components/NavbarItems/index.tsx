import { memo } from 'react';

import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import postcardsLogo from '@assets/images/postcards-logo.png';
import { Link } from 'react-router-dom';

import { StyledAccordion, StyledAccordionDetails, StyledAccordionSummary, StyledLogoBox } from './styled';

const NavbarItems = () => (
  <>
    <StyledLogoBox>
      <img src={postcardsLogo} alt="postcards Logo" />
    </StyledLogoBox>
    <StyledAccordion>
      <StyledAccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>Accordion 1</Typography>
      </StyledAccordionSummary>
      <StyledAccordionDetails>
        <Link to="/">
          Open Jobs
        </Link>
        <Link to="/">
          Completed Jobs
        </Link>
        <Link to="/">
          Cancelled Jobs
        </Link>
      </StyledAccordionDetails>
    </StyledAccordion>
    <StyledAccordion>
      <StyledAccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel2a-content"
        id="panel2a-header"
      >
        <Typography>Accordion 2</Typography>
      </StyledAccordionSummary>
      <StyledAccordionDetails>
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </Typography>
      </StyledAccordionDetails>
    </StyledAccordion>
  </>
);

export default memo(NavbarItems);
