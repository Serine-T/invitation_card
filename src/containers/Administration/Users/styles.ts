import { styled } from '@mui/material/styles';
import TableCell from '@mui/material/TableCell';
import Box from '@mui/material/Box';

import { gettingStatusColor } from './helpers';

export const StyledTableCell = styled(TableCell)(() => ({
  width: '193px',
}));

// TODO: USER ADD STATUS ENUM
export const StyledStatusBtn = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'status',
})<{ status: string }>(({ theme, status }) => ({
  width: 'max-content',
  height: '20px',
  background: gettingStatusColor(status, theme),
  textTransform: 'capitalize',
  borderRadius: '12px',
  fontWeight: 500,
  display: 'flex',
  alignItems: 'center',
  padding: '0 12px',
}));
