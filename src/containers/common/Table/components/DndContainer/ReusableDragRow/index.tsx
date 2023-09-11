import { ReactNode, memo } from 'react';

import { Draggable, DraggableProvided, DraggableStateSnapshot } from '@hello-pangea/dnd';

import { StyledDraggableRow } from '../../TablesActions/DraggableRow/styled';

interface IReusableDragRow {
  id: string;
  index: number;
  gridTemplateColumns: string;
  children: (args: {
    providedDraggable: DraggableProvided;
    snapshot: DraggableStateSnapshot;
  }) => ReactNode;
}

const ReusableDragRow = ({ id, index, gridTemplateColumns, children }:IReusableDragRow) => (
  <Draggable draggableId={id} index={index}>
    {(providedDraggable, snapshot) => {
      return (
        <StyledDraggableRow
          ref={providedDraggable.innerRef}
          data-snapshot={snapshot}
          {...providedDraggable.draggableProps}
          isDraggingOver={!!snapshot.draggingOver}
          gridTemplateColumns={gridTemplateColumns}
        >
          {children({ providedDraggable, snapshot })}
        </StyledDraggableRow>
      );
    }}
  </Draggable>
);

export default memo(ReusableDragRow);
