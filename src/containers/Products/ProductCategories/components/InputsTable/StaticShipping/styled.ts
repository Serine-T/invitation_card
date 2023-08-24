import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

export const StyledBox = styled(Box)(() => ({
  maxWidth: '260px',
  display: 'grid',
  columnGap: '40px',
  gridTemplateColumns: '116px 150px',
  justifyContent: 'space-between',
  'MuiFormControlLabel-root': {
    fontSIze: '12px',
  },
}));
