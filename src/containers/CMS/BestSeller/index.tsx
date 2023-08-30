import { memo, useCallback } from 'react';

import TableCell from '@mui/material/TableCell';
import { useNavigate } from 'react-router-dom';
import PAGE_ROUTES from '@routes/routingEnum';
import StyledTypography from '@containers/common/StyledTypography';
import DeleteBtn from '@containers/common/DeleteAction';
import StyledTable from '@containers/common/Table';
import DragAndDropIcon from '@containers/common/Icons/DragAndDrop';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import PageTitle from '@containers/common/PageTitle';
import {
  DragDropContext, Droppable,
  Draggable, DroppableProvided, DropResult,
} from '@hello-pangea/dnd';
import { StyledDraggableRow } from '@containers/common/DraggableRow/styled';
import Loader from '@containers/common/Loader';
import useMount from '@customHooks/useMount';
import { deleteBestSeller, getAllBestSellers, reorderBestSellers } from '@features/bestSellers/actions';
import { useAppDispatch, useAppSelector } from '@features/app/hooks';
import { selectBestSellers } from '@features/bestSellers/selectors';
import { getReorderedArray } from '@utils/helpers';
import { setBestSellers } from '@features/bestSellers/slice';
import EmptyState from '@containers/common/EmptyState';
import { getAllSubcategories } from '@features/subcategories/actions';

import { headSliderCells } from './helpers';

const BestSeller = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading, data: bestSellers } = useAppSelector(selectBestSellers);
  const { isLoading: subcategoriesLoading, data: subcategories } = useAppSelector(selectBestSellers);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleAdd = useCallback(() => navigate(PAGE_ROUTES.ADD_BEST_SELLER), []);
  const handleEdit = (id:string) => navigate(`/cms/best-seller/edit/${id}`);
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
      <PageTitle title="Best Sellers" btnName="Add Section" handleAdd={handleAdd} isShowBtn={!!subcategories.length} />
      {bestSellers.length ? (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(providedDroppable: DroppableProvided) => {
              return (
                <Box
                  {...providedDroppable.droppableProps}
                  ref={providedDroppable.innerRef}
                >
                  <StyledTable headCells={headSliderCells}>
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
                                <StyledTypography
                                  color="blue"
                                  underLine
                                  onClick={() => handleEdit(id)}
                                  variant="body3"
                                  cursor="pointer"
                                >
                                  {title}
                                </StyledTypography>
                              </TableCell>
                              <TableCell width="173px">{displayOnSite ? 'Yes' : 'No'}</TableCell>
                              <TableCell width="140px">
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
