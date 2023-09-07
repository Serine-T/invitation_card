import { memo, useCallback, useEffect } from 'react';

import TableCell from '@mui/material/TableCell';
import PAGE_ROUTES from '@routes/routingEnum';
import StyledTable from '@containers/common/Table';
import DndBtn from '@containers/common/Table/components/TablesActions/DndAction';
import Box from '@mui/material/Box';
import DeleteBtn from '@containers/common/Table/components/TablesActions/DeleteAction';
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
  deleteTemplateCategory,
  getAllTemplateCategories, reorderTemplateCategories, searchTemplateCategories,
} from '@features/templateCategories/actions';
import { selectTemplateCategories } from '@features/templateCategories/selectors';
import { setTemplateCategories } from '@features/templateCategories/slice';
import RowTitle from '@containers/common/Table/components/RowTitle';

import { headSliderCells } from './helpers';
import SearchSection from './components/SearchSection';
import { IFiltersForm } from './components/SearchSection/helpers';

const TemplateCategories = () => {
  const dispatch = useAppDispatch();
  const params = queryString.parse(window.location.search);
  const { searchTerm = '' } = params as IFiltersForm;

  const fetchData = useCallback(() => {
    const query = {
      searchTerm: searchTerm as string,
    };

    searchTerm ? dispatch(searchTemplateCategories(query)) : dispatch(getAllTemplateCategories());
  }, [searchTerm, dispatch]);

  useEffect(
    () => fetchData(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchTerm],
  );

  const deleteAction = (id: string) => {
    dispatch(deleteTemplateCategory(id)).unwrap().then(() => {
      dispatch(getAllTemplateCategories());
    }).catch(() => {});
  };

  const { data: templateCategories, isLoading } = useAppSelector(selectTemplateCategories);

  const items = [...templateCategories];

  const onDragEnd = (result: DropResult) => {
    const { destination } = result;

    if (destination) {
      const [removed] = items.splice(result.source.index, 1);

      items.splice(destination.index, 0, removed);

      const sortedData = getReorderedArray(items);

      dispatch(reorderTemplateCategories(sortedData)).unwrap().then(() => {
        dispatch(setTemplateCategories(items));
      }).catch(() => dispatch(getAllTemplateCategories()));
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <PageTitle title="Template Categories" btnName="Add Template Category" path={PAGE_ROUTES.ADD_TEMPLATE_CATEGORY} />
      { (searchTerm || !!templateCategories.length) && <SearchSection /> }
      {templateCategories.length ? (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(providedDroppable: DroppableProvided) => {
              return (
                <Box
                  {...providedDroppable.droppableProps}
                  ref={providedDroppable.innerRef}
                >
                  <StyledTable headCells={headSliderCells}>
                    {templateCategories.map(({ name, id }, index) => (
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
                              gridTemplateColumns="auto 140px"
                            >
                              <TableCell>
                                <RowTitle title={name} path={`/products/template-categories/edit/${id}`} />
                              </TableCell>
                              <TableCell width="140px">
                                <DndBtn providedDraggable={providedDraggable} />
                              </TableCell>
                              <TableCell width="150px">
                                <DeleteBtn
                                  deleteAction={() => deleteAction(id)}
                                  questionText="Are you sure you want to delete this template category ?"
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
          text={searchTerm ? 'No search results found'
            : 'You don’t have any template categories, please add new to proceed'}
        />
      )}
    </>
  );
};

export default memo(TemplateCategories);
