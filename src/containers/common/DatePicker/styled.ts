import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

import StyledTypography from '../StyledTypography';

export const StyledCalendarIcon = styled(StyledTypography)(({ theme }) => ({
  height: '35px',
  border: `1px solid ${theme.palette.grey[400]}`,
  padding: '8px',
  borderRadius: '4px',
  marginLeft: '8px',
}));

export const StyledBox = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
}));
