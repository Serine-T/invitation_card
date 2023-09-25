import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

export const StyledBox = styled(Box)(() => ({
  width: '100%',
  display: 'grid',
  justifyContent: 'space-between',
  gridTemplateColumns: '1fr auto',
  alignItems: 'center',
  columnGap: '16px',
}));
