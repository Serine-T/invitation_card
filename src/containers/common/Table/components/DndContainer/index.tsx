import { ReactNode, memo } from 'react';

import {
  DragDropContext, DropResult, Droppable, DroppableProvided,
} from '@hello-pangea/dnd';
import Box from '@mui/material/Box';

interface IDndContainer {
  reordingData: (result: DropResult) => void;
  children: ReactNode;
}

const DndContainer = ({ reordingData, children }: IDndContainer) => {
  const onDragEnd = (result: DropResult) => {
    const { destination } = result;

    if (destination) {
      reordingData(result);
    }
  };

  return (
    <Box mb="24px">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(providedDroppable: DroppableProvided) => {
            return (
              <Box
                {...providedDroppable.droppableProps}
                ref={providedDroppable.innerRef}
              >
                {children}
              </Box>
            );
          }}
        </Droppable>
      </DragDropContext>
    </Box>
  );
};

export default memo(DndContainer);
