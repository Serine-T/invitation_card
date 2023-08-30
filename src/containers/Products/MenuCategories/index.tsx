import { memo, useCallback, useEffect } from 'react';

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
import { useAppDispatch, useAppSelector } from '@features/app/hooks';
import { deleteCategory, getAllCategories, reorderCategories, searchCategories } from '@features/categories/actions';
import { selectCategories } from '@features/categories/selectors';
import Loader from '@containers/common/Loader';
import { setCategories } from '@features/categories/slice';
import PageTitle from '@containers/common/PageTitle';
import EmptyState from '@containers/common/EmptyState';
import { getReorderedArray } from '@utils/helpers';
import queryString from 'query-string';

import { headSliderCells } from './helpers';
import SearchSection from './components/SearchSection';
import { IFiltersForm } from './components/SearchSection/helpers';

const MenuCategories = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const params = queryString.parse(window.location.search);
  const { searchTerm = '', displayInHeader: displayInHeaderQuery = '' } = params as IFiltersForm;
  const isSearchTerm = searchTerm || displayInHeaderQuery;

  const fetchCategories = useCallback(() => {
    const query = {
      searchTerm: searchTerm as string,
      displayInHeader: displayInHeaderQuery as string,
    };

    isSearchTerm ? dispatch(searchCategories(query)) : dispatch(getAllCategories());
  }, [isSearchTerm, searchTerm, displayInHeaderQuery, dispatch]);

  useEffect(
    () => fetchCategories(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isSearchTerm, searchTerm, displayInHeaderQuery],
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleAdd = useCallback(() => navigate(PAGE_ROUTES.ADD_MENU_CATEGORY), []);
  const handleEdit = (id:string) => navigate(`/products/menu-categories/edit/${id}`);
  const deleteAction = (id: string) => {
    dispatch(deleteCategory(id)).unwrap().then(() => {
      dispatch(getAllCategories());
    }).catch(() => {});
  };

  const { data: categories, isLoading } = useAppSelector(selectCategories);

  const items = [...categories];

  const onDragEnd = (result: DropResult) => {
    const { destination } = result;

    if (destination) {
      const [removed] = items.splice(result.source.index, 1);

      items.splice(destination.index, 0, removed);

      const sortedData = getReorderedArray(items);

      dispatch(reorderCategories(sortedData)).unwrap().then(() => {
        dispatch(setCategories(items));
      }).catch(() => dispatch(getAllCategories()));
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <PageTitle title="Menu Categories" btnName="Add Category" handleAdd={handleAdd} />
      { (isSearchTerm || !!categories.length) && <SearchSection /> }
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
                                  deleteAction={() => deleteAction(id)}
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
      ) : (
        <EmptyState
          text={isSearchTerm ? 'No search results found'
            : 'You don’t have any categories, please add new to proceed'}
        />
      )}
    </>
  );
};

export default memo(MenuCategories);
