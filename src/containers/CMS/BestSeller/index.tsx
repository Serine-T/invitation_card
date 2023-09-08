import { memo } from 'react';

import DndBtn from '@containers/common/Table/components/TablesActions/DndAction';
import TableCell from '@mui/material/TableCell';
import PAGE_ROUTES from '@routes/routingEnum';
import DeleteBtn from '@containers/common/Table/components/TablesActions/DeleteAction';
import StyledTable from '@containers/common/Table';
import PageTitle from '@containers/common/PageTitle';
import {
  DragDropContext, Droppable,
  Draggable, DroppableProvided, DropResult,
} from '@hello-pangea/dnd';
import { StyledDraggableRow } from '@containers/common/Table/components/TablesActions/DraggableRow/styled';
import Loader from '@containers/common/Loader';
import useMount from '@customHooks/useMount';
import { deleteBestSeller, getAllBestSellers, reorderBestSellers } from '@features/bestSellers/actions';
import { useAppDispatch, useAppSelector } from '@features/app/hooks';
import { selectBestSellers } from '@features/bestSellers/selectors';
import { getReorderedArray } from '@utils/helpers';
import { setBestSellers } from '@features/bestSellers/slice';
import EmptyState from '@containers/common/EmptyState';
import { getAllSubcategories } from '@features/subcategories/actions';
import { selectSubcategories } from '@features/subcategories/selectors';
import RowTitle from '@containers/common/Table/components/RowTitle';

import { headSliderCells } from './helpers';

const BestSeller = () => {
  const dispatch = useAppDispatch();
  const { isLoading, data: bestSellers } = useAppSelector(selectBestSellers);
  const { isLoading: subcategoriesLoading, data: subcategories } = useAppSelector(selectSubcategories);
  const deleteAction = (id: string) => {
    dispatch(deleteBestSeller(id)).unwrap().then(() => {
      dispatch(getAllBestSellers());
    }).catch(() => {});
  };

  useMount(() => {
    dispatch(getAllSubcategories());
    dispatch(getAllBestSellers());
  });

  const items = [...bestSellers];
  const onDragEnd = (result: DropResult) => {
    const { destination } = result;

    if (destination) {
      const [removed] = items.splice(result.source.index, 1);

      items.splice(destination.index, 0, removed);

      const sortedData = getReorderedArray(items);

      dispatch(reorderBestSellers(sortedData)).unwrap().then(() => {
        dispatch(setBestSellers(items));
      }).catch(() => dispatch(getAllBestSellers()));
    }
  };

  if (isLoading || subcategoriesLoading) {
    return <Loader />;
  }

  return (
    <>
      <PageTitle
        title="Best Sellers"
        btnName="Add Section"
        path={PAGE_ROUTES.ADD_BEST_SELLER}
        isShowBtn={!!subcategories.length}
      />
      {bestSellers.length ? (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(providedDroppable: DroppableProvided) => (
              <StyledTable headCells={headSliderCells} providedDroppable={providedDroppable}>
                {items.map(({ title, displayOnSite, id }, index) => (

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
                            <RowTitle title={title} path={`/cms/best-seller/edit/${id}`} />
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
            )}
          </Droppable>
        </DragDropContext>
      ) : (
        <EmptyState
          text={
          subcategories.length ? 'You don’t have any bestseller, please add new to proceed'
            : 'You don’t have any subcategory, please add new to proceed'
      }
        />
      )}
    </>
  );
};

export default memo(BestSeller);
