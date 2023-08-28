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
import {
  DragDropContext, Droppable,
  Draggable, DroppableProvided, DropResult,
} from '@hello-pangea/dnd';
import { StyledDraggableRow } from '@containers/common/DraggableRow/styled';
import useMount from '@customHooks/useMount';
import { useAppDispatch, useAppSelector } from '@features/app/hooks';
import { getAllCategories } from '@features/categories/actions';
import { selectCategories } from '@features/categories/selectors';
import Loader from '@containers/common/Loader';
import { setCategories } from '@features/categories/slice';
import PageTitle from '@containers/common/PageTitle';
import EmptyState from '@containers/common/EmptyState';

import { headSliderCells } from './helpers';
import SearchSection from './components/SearchSection';

const MenuCategories = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleAdd = useCallback(() => navigate(PAGE_ROUTES.ADD_MENU_CATEGORY), []);
  const handleEdit = (id:string) => navigate(`/products/menu-categories/edit/${id}`);
  const deleteAction = () => {
    console.log('deleteAction');
  };

  const { data: categories, isLoading } = useAppSelector(selectCategories);

  useMount(() => {
    dispatch(getAllCategories());
  });

  const onDragEnd = (result: DropResult) => {
    const { destination } = result;

    if (destination) {
      const newItems = [...categories];
      const [removed] = newItems.splice(result.source.index, 1);

      newItems.splice(destination.index, 0, removed);
      dispatch(setCategories(newItems));
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <PageTitle title="Menu Categories" btnName="Add Category" handleAdd={handleAdd} />
      { !!categories.length && <SearchSection />}

      {categories.length ? (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(providedDroppable: DroppableProvided) => {
              return (
                <Box
                  {...providedDroppable.droppableProps}
                  ref={providedDroppable.innerRef}
                >
                  <StyledTable headCells={headSliderCells}>
                    {categories.map(({ title, displayInHeader, id }, index) => (
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
                              gridTemplateColumns="auto 138px 140px 150px"
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
                              <TableCell width="138px">{displayInHeader ? 'Yes' : 'No'}</TableCell>
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
                                  deleteAction={deleteAction}
                                  questionText="Are you sure you want to delete this category ?"
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
      ) : <EmptyState text="You don’t have any categories, please add new to proceed" />}
    </>
  );
};

export default memo(MenuCategories);
