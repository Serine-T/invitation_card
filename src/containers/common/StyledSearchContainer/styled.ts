import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

export const StyledSearchContainer = styled(Box)(({ theme }) => ({
  padding: '24px',
  background: theme.palette.grey[700],
  border: `1px solid ${theme.palette.grey[500]}`,
  marginBottom: '24px',
}));

export const StyledSearchRows = styled(Box)(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '24px',
}));
