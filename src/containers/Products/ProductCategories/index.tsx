import { memo } from 'react';

import TableCell from '@mui/material/TableCell';
import { StyledTitleBox } from '@containers/common/PageTitle/styled';
import Typography from '@mui/material/Typography';
import Button from '@containers/common/Button';
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
import { deleteSubcategory, getAllSubcategories, reorderSubcategories } from '@features/subcategories/actions';
import Loader from '@containers/common/Loader';
import { selectSubcategories } from '@features/subcategories/selectors';
import EmptyState from '@containers/common/EmptyState';
import { getReorderedArray } from '@utils/helpers';
import { setSubcategories } from '@features/subcategories/slice';

import { headSliderCells } from './helpers';
import SearchSection from './components/SearchSection';

const ProductCategories = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { data: subcategories, isLoading } = useAppSelector(selectSubcategories);

  const handleAdd = () => navigate(PAGE_ROUTES.ADD_PRODUCT_CATEGORIES);
  const handleEdit = (id:string) => navigate(`/products/product-categories/edit/${id}`);
  const deleteAction = (id: string) => {
    dispatch(deleteSubcategory(id)).unwrap().then(() => {
      dispatch(getAllSubcategories());
    }).catch(() => {});
  };

  const items = [...subcategories];

  const onDragEnd = (result: DropResult) => {
    const { destination } = result;

    if (destination) {
      const [removed] = items.splice(result.source.index, 1);

      items.splice(destination.index, 0, removed);

      const sortedData = getReorderedArray(items);

      dispatch(reorderSubcategories(sortedData)).unwrap().then(() => {
        dispatch(setSubcategories(items));
      }).catch(() => dispatch(getAllSubcategories()));
    }
  };

  useMount(() => {
    dispatch(getAllSubcategories());
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <StyledTitleBox>
        <Typography variant="h2">Subcategories</Typography>
        <Button width="130px" onClick={handleAdd}>Add Subcategory</Button>
      </StyledTitleBox>
      { !!subcategories?.length && <SearchSection />}
      {subcategories?.length ? (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(providedDroppable: DroppableProvided) => {
              return (
                <Box
                  {...providedDroppable.droppableProps}
                  ref={providedDroppable.innerRef}
                >
                  <StyledTable headCells={headSliderCells}>
                    {items.map(({ title, visibleOnSite, id }, index) => (
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
                              <TableCell width="138px">{visibleOnSite ? 'Yes' : 'No'}</TableCell>
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
                                  questionText="Are you sure you want to delete this subcategory ?"
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
        <EmptyState text="You don’t have any categories, please add new to proceed" />
      )}
    </>
  );
};

export default memo(ProductCategories);
