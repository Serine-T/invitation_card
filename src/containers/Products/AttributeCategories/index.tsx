import { memo, useCallback, useEffect } from 'react';

import TableCell from '@mui/material/TableCell';
import { useNavigate } from 'react-router-dom';
import PAGE_ROUTES from '@routes/routingEnum';
import StyledTable from '@containers/common/Table';
import Box from '@mui/material/Box';
import {
  DragDropContext, Droppable,
  Draggable, DroppableProvided, DropResult,
} from '@hello-pangea/dnd';
import { StyledDraggableRow } from '@containers/common/Table/components/TablesActions/DraggableRow/styled';
import { useAppDispatch, useAppSelector } from '@features/app/hooks';
import Loader from '@containers/common/Loader';
import PageTitle from '@containers/common/PageTitle';
import EmptyState from '@containers/common/EmptyState';
import { getReorderedArray } from '@utils/helpers';
import queryString from 'query-string';
import {
  getAllAttributeCategories, reorderAttributeCategories, searchAttributeCategories,
} from '@features/attributeCategories/actions';
import { selectAttributeCategories } from '@features/attributeCategories/selectors';
import { setAttributeCategories } from '@features/attributeCategories/slice';
import DndBtn from '@containers/common/Table/components/TablesActions/DndAction';
import RowTitle from '@containers/common/Table/components/RowTitle';

import { headSliderCells } from './helpers';
import SearchSection from './components/SearchSection';
import { IFiltersForm } from './components/SearchSection/helpers';

const AttributeCategories = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const params = queryString.parse(window.location.search);
  const { searchTerm = '' } = params as IFiltersForm;

  const fetchData = useCallback(() => {
    const query = {
      searchTerm: searchTerm as string,
    };

    searchTerm ? dispatch(searchAttributeCategories(query)) : dispatch(getAllAttributeCategories());
  }, [searchTerm, dispatch]);

  useEffect(
    () => fetchData(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchTerm],
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleAdd = useCallback(() => navigate(PAGE_ROUTES.ADD_ATTRIBUTE_CATEGORIES), []);

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
      { (searchTerm || !!attributeCategories.length) && <SearchSection /> }
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
                    {attributeCategories.map(({ name, id }, index) => (
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
                                <RowTitle title={name} path={`/products/attribute-categories/edit/${id}`} />
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
      ) : (
        <EmptyState
          text={searchTerm ? 'No search results found'
            : 'You don’t have any attribute categories, please add new to proceed'}
        />
      )}
    </>
  );
};

export default memo(AttributeCategories);
