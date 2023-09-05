import { memo } from 'react';

import Stack from '@mui/material/Stack';
import { DraggableProvided } from '@hello-pangea/dnd';
import DragAndDropIcon from '@containers/common/Icons/DragAndDrop';

import StyledTypography from '../StyledTypography';

interface IDeleteAction {
  providedDraggable: DraggableProvided;
}

const DndButton = ({ providedDraggable }: IDeleteAction) => {
  return (
    <Stack direction="row" alignItems="center" {...providedDraggable.dragHandleProps}>
      <DragAndDropIcon />
      <StyledTypography
        color="blue"
        variant="body3"
        cursor="grab"
        ml="8px"
      >
        Drag to Reorder
      </StyledTypography>
    </Stack>
  );
};

export default memo(DndButton);
