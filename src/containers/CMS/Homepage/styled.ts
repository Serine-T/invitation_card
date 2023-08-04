import { styled } from '@mui/material/styles';
import { StyledTableRow } from '@containers/common/Table/styled';

export const StyledDraggableRow = styled(StyledTableRow, {
  shouldForwardProp: (prop) => prop !== 'isDraggingOver',
})<{isDraggingOver?: boolean }>(({
  theme, isDraggingOver,
}) => ({
  background: isDraggingOver ? theme.palette.grey[700] : '',
  maxWidth: isDraggingOver ? '100%' : '100%',
  display: isDraggingOver ? 'grid' : '',
  gridTemplateColumns: isDraggingOver ? 'auto 227px  148px 68px' : '',
}));
