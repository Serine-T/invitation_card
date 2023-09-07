import { memo } from 'react';

import DndBtn from '@containers/common/Table/components/TablesActions/DndAction';
import Box from '@mui/material/Box';
import TableCell from '@mui/material/TableCell';
import DeleteBtn from '@containers/common/Table/components/TablesActions/DeleteAction';
import StyledTable from '@containers/common/Table';
import {
  DragDropContext, Droppable,
  Draggable, DroppableProvided,
  DropResult,
} from '@hello-pangea/dnd';
import { StyledDraggableRow } from '@containers/common/Table/components/TablesActions/DraggableRow/styled';
import { useAppDispatch, useAppSelector } from '@features/app/hooks';
import { selectBanners } from '@features/banners/selectors';
import { setBanners, setSilders } from '@features/banners/slice';
import Loader from '@containers/common/Loader';
import { deleteBanner, getAllBanners, reorderBanners } from '@features/banners/actions';
import { getReorderedArray } from '@utils/helpers';
import RowTitle from '@containers/common/Table/components/RowTitle';

import {
  headBannerCells,
  headSliderCells,
} from './helpers';

interface IBannersProps {
  isSlider?: boolean;
}

const Banners = ({ isSlider }: IBannersProps) => {
  const dispatch = useAppDispatch();
  const deleteAction = (id: string) => {
    dispatch(deleteBanner(id)).unwrap().then(() => {
      dispatch(getAllBanners());
    }).catch(() => {});
  };

  const { banners, sliders, isLoading } = useAppSelector(selectBanners);

  const items = isSlider ? [...sliders] : [...banners];

  const onDragEnd = (result:DropResult) => {
    const { destination } = result;

    if (destination) {
      const [removed] = items.splice(result.source.index, 1);

      items.splice(destination.index, 0, removed);

      const sortedData = getReorderedArray(items);

      dispatch(reorderBanners(sortedData)).unwrap().then(() => {
        dispatch(isSlider ? setSilders(items) : setBanners(items));
      }).catch(() => dispatch(getAllBanners()));
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Box mt={isSlider ? '' : '40px'}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(providedDroppable: DroppableProvided) => {
            return (
              <Box
                {...providedDroppable.droppableProps}
                ref={providedDroppable.innerRef}
              >
                <StyledTable headCells={isSlider ? headSliderCells : headBannerCells}>
                  {items.map(({ title, displayOnSite, id = '' }, index) => (
                    <Draggable
                      key={id}
                      draggableId={id}
                      index={index}
                    >
                      {(providedDraggable, snapshot) => {
                        return (
                          <StyledDraggableRow
                            ref={providedDraggable.innerRef}
                            data-snapshot={snapshot}
                            {...providedDraggable.draggableProps}
                            isDraggingOver={!!snapshot.draggingOver}
                            gridTemplateColumns="auto 173px  140px 150px"
                          >
                            <TableCell>
                              <RowTitle title={title} path={`/cms/homepage/edit/${id}`} />
                            </TableCell>
                            <TableCell width="173px">{displayOnSite ? 'Yes' : 'No'}</TableCell>
                            <TableCell width="140px">
                              <DndBtn providedDraggable={providedDraggable} />
                            </TableCell>
                            <TableCell width="150px">
                              <DeleteBtn
                                deleteAction={() => deleteAction(id)}
                                questionText="Are you sure you want to delete this banner ?"
                              />
                            </TableCell>
                          </StyledDraggableRow>
                        );
                      }}
                    </Draggable>
                  ))}
                </StyledTable>
              </Box>
            );
          }}
        </Droppable>
      </DragDropContext>
    </Box>
  );
};

export default memo(Banners);
