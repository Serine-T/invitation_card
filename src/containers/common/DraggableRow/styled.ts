import { styled } from '@mui/material/styles';
import { StyledTableRow } from '@containers/common/Table/styled';

export const StyledDraggableRow = styled(StyledTableRow, {
  shouldForwardProp: (prop) => prop !== 'isDraggingOver' && prop !== 'gridTemplateColumns',
})<{isDraggingOver?: boolean; gridTemplateColumns: string }>(({
  theme, isDraggingOver, gridTemplateColumns,
}) => ({
  background: isDraggingOver ? theme.palette.grey[700] : '',
  maxWidth: isDraggingOver ? '100%' : '100%',
  display: isDraggingOver ? 'grid' : '',
  gridTemplateColumns: isDraggingOver ? gridTemplateColumns : '',
}));
