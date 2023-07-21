import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

export const StyledLogoBox = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',

  img: {
    width: 170,
    objectFit: 'contain',
  },
}));

export const StyledAccordion = styled(Accordion)(() => ({
  '&.MuiAccordion-root': {
    padding: 0,
    boxShadow: 'none',
    margin: 0,
    marginBottom: 8,
  },

  '&::before': {
    height: 0,
  },

}));

export const StyledAccordionSummary = styled(AccordionSummary)(() => ({
  padding: 0,
  flexGrow: 0,
  justifyContent: 'flex-start',
  alignItems: 'center',
  minHeight: '37px',

  '&.Mui-expanded': {
    minHeight: '37px',
  },
  '.MuiAccordionSummary-content': {
    flexGrow: 0,
    margin: 0,
  },
  '.MuiAccordionSummary-content.Mui-expanded': {
    margin: 0,
  },
}));

export const StyledAccordionDetails = styled(AccordionDetails)(() => ({
  padding: 0,
  margin: '8px 0 6px',
}));

export const StyledMenuItem = styled(AccordionDetails)(() => ({
  padding: 0,
  margin: '8px 0 6px',
}));
