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
import Loader from '@containers/common/Loader';
import PageTitle from '@containers/common/PageTitle';
import EmptyState from '@containers/common/EmptyState';
import { getReorderedArray } from '@utils/helpers';
import queryString from 'query-string';
import {
  deleteAttributeCategory,
  getAllAttributeCategories, reorderAttributeCategories, searchAttributeCategories,
} from '@features/attributeCategories/actions';
import { selectAttributeCategories } from '@features/attributeCategories/selectors';
import { setAttributeCategories } from '@features/attributeCategories/slice';

import { headSliderCells } from './helpers';
import SearchSection from './components/SearchSection';
import { IFiltersForm } from './components/SearchSection/helpers';

const AttributeCategories = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const params = queryString.parse(window.location.search);
  const { searchTerm = '', displayInHeader: displayInHeaderQuery = '' } = params as IFiltersForm;
  const isSearchTerm = searchTerm || displayInHeaderQuery;

  const fetchData = useCallback(() => {
    const query = {
      searchTerm: searchTerm as string,
      displayInHeader: displayInHeaderQuery as string,
    };

    isSearchTerm ? dispatch(searchAttributeCategories(query)) : dispatch(getAllAttributeCategories());
  }, [isSearchTerm, searchTerm, displayInHeaderQuery, dispatch]);

  useEffect(
    () => fetchData(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isSearchTerm, searchTerm, displayInHeaderQuery],
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleAdd = useCallback(() => navigate(PAGE_ROUTES.ADD_ATTRIBUTE_CATEGORIES), []);
  const handleEdit = (id:string) => navigate(`/products/attribute-categories/edit/${id}`);

  const deleteAction = (id: string) => {
    dispatch(deleteAttributeCategory(id)).unwrap().then(() => {
      dispatch(getAllAttributeCategories());
    }).catch(() => {});
  };

  const { data: attributeCategories, isLoading } = useAppSelector(selectAttributeCategories);

  const items = [...attributeCategories];

  const onDragEnd = (result: DropResult) => {
    const { destination } = result;

    if (destination) {
      const [removed] = items.splice(result.source.index, 1);

      items.splice(destination.index, 0, removed);

      const sortedData = getReorderedArray(items);

      dispatch(reorderAttributeCategories(sortedData)).unwrap().then(() => {
        dispatch(setAttributeCategories(items));
      }).catch(() => dispatch(getAllAttributeCategories()));
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <PageTitle title="Attribute Categories" btnName="Add Attribute Category" handleAdd={handleAdd} />
      { (isSearchTerm || !!attributeCategories.length) && <SearchSection /> }
      {attributeCategories.length ? (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(providedDroppable: DroppableProvided) => {
              return (
                <Box
                  {...providedDroppable.droppableProps}
                  ref={providedDroppable.innerRef}
                >
                  <StyledTable headCells={headSliderCells}>
                    {attributeCategories.map(({ title, displayInHeader, id }, index) => (
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
                                  questionText="Are you sure you want to delete this attribute category ?"
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
            : 'You don’t have any attribute categories, please add new to proceed'}
        />
      )}
    </>
  );
};

export default memo(AttributeCategories);
