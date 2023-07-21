import { styled } from '@mui/material/styles';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

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

export const StyledAccordionSummary = styled(AccordionSummary, {
  shouldForwardProp: (prop) => prop !== 'isActive',
})<{isActive: boolean}>(({ theme, isActive }) => ({
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
  svg: {
    width: '20px',
    height: '18px',
    color: isActive ? theme.palette.primary.dark : '',
  },
}));

export const StyledAccordionDetails = styled(AccordionDetails)(() => ({
  padding: 0,
  margin: '8px 0 6px',
}));
