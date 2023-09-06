import { memo, useCallback, useEffect } from 'react';

import TableCell from '@mui/material/TableCell';
import { useNavigate } from 'react-router-dom';
import PAGE_ROUTES from '@routes/routingEnum';
import StyledTypography from '@containers/common/StyledTypography';
import StyledTable from '@containers/common/Table';
import Box from '@mui/material/Box';
import DndBtn from '@containers/common/Table/TablesActions/DndAction';
import {
  DragDropContext, Droppable,
  Draggable, DroppableProvided, DropResult,
} from '@hello-pangea/dnd';
import { StyledDraggableRow } from '@containers/common/Table/TablesActions/DraggableRow/styled';
import { useAppDispatch, useAppSelector } from '@features/app/hooks';
import Loader from '@containers/common/Loader';
import PageTitle from '@containers/common/PageTitle';
import EmptyState from '@containers/common/EmptyState';
import { getReorderedArray } from '@utils/helpers';
import queryString from 'query-string';
import { reorderAttributes, searchAttributes } from '@features/attributes/actions';
import { selectAttributes } from '@features/attributes/selectors';

import { IFiltersForm } from './components/SearchSection/helpers';
import SearchSection from './components/SearchSection';

const Attribute = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const params = queryString.parse(window.location.search);
  const { searchTerm = '' } = params as IFiltersForm;
  const query = {
    searchTerm: searchTerm as string,
  };

  const fetchData = useCallback(() => {
    dispatch(searchAttributes(query));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  useEffect(
    () => fetchData(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchTerm, searchTerm],
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleAdd = useCallback(() => navigate(PAGE_ROUTES.ADD_ATTRIBUTE), []);
  const handleEdit = (id:string) => navigate(`/products/attributes/edit/${id}`);

  const { data: attributesList, isLoading } = useAppSelector(selectAttributes);

  const onDragEnd = (result: DropResult) => {
    const items = [...attributesList];
    const { destination, draggableId } = result;

    const draggableItem = items.find((item) => item.attributes.find((i) => i.id === draggableId));

    if (destination && draggableItem) {
      const draggableAttributes = [...draggableItem.attributes];
      const [removed] = draggableAttributes.splice(result.source.index, 1);

      draggableAttributes.splice(destination.index, 0, removed);

      const sortedData = getReorderedArray(draggableAttributes);

      dispatch(reorderAttributes(sortedData)).unwrap().finally(() => fetchData());
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <PageTitle title="Attributes" btnName="Add Attribute" handleAdd={handleAdd} />
      { (searchTerm || !!attributesList.length) && <SearchSection /> }
      {attributesList.length ? attributesList.map(({ id: attributeId, name: attributeName, attributes }) => (
        <Box mb="24px" key={attributeId}>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
              {(providedDroppable: DroppableProvided) => {
                return (
                  <Box
                    {...providedDroppable.droppableProps}
                    ref={providedDroppable.innerRef}
                  >
                    <StyledTable headCells={[{ label: attributeName }, { label: 'ACTIONS' }]}>
                      {attributes.map(({ name, id, nickname }, index) => (
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
                                gridTemplateColumns="auto 260px"
                              >
                                <TableCell>
                                  <StyledTypography
                                    color="blue"
                                    underLine
                                    onClick={() => handleEdit(id)}
                                    variant="body3"
                                    cursor="pointer"
                                  >
                                    {`${name} / ${nickname}`}
                                  </StyledTypography>
                                </TableCell>
                                <TableCell width="260px">
                                  <DndBtn providedDraggable={providedDraggable} />
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
      ))
        : (
          <EmptyState
            text={searchTerm ? 'No search results found'
              : 'You don’t have any attribute, please add new to proceed'}
          />
        )}
    </>
  );
};

export default memo(Attribute);
