import { memo, useCallback, useEffect } from 'react';

import DeleteBtn from '@containers/common/Table/components/TablesActions/DeleteAction';
import TableCell from '@mui/material/TableCell';
import { useNavigate } from 'react-router-dom';
import PAGE_ROUTES from '@routes/routingEnum';
import StyledTable from '@containers/common/Table';
import DndBtn from '@containers/common/Table/components/TablesActions/DndAction';
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
  deleteTemplate,
  reorderTemplates, searchTemplates,
} from '@features/templates/actions';
import { selectTemplates } from '@features/templates/selectors';
import { Typography } from '@mui/material';
import RowTitle from '@containers/common/Table/components/RowTitle';

import { headSliderCells } from './helpers';
import SearchSection from './components/SearchSection';
import { IFiltersForm } from './components/SearchSection/helpers';

const Templates = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const params = queryString.parse(window.location.search);
  const { searchTerm = '' } = params as IFiltersForm;
  const query = {
    searchTerm: searchTerm as string,
  };

  const fetchData = useCallback(() => {
    dispatch(searchTemplates(query));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  useEffect(
    () => fetchData(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchTerm],
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleAdd = useCallback(() => navigate(PAGE_ROUTES.ADD_TEMPLATE), []);
  const deleteAction = (id: string) => {
    dispatch(deleteTemplate(id)).unwrap().then(() => {
      fetchData();
    }).catch(() => {});
  };

  const { data: templatesList, isLoading } = useAppSelector(selectTemplates);

  const onDragEnd = (result: DropResult) => {
    const items = [...templatesList];
    const { destination, draggableId } = result;
    const draggableItem = items.find((item) => item.templates.find((i) => i.id === draggableId));

    if (destination && draggableItem) {
      const draggableTemplates = [...draggableItem.templates];
      const [removed] = draggableTemplates.splice(result.source.index, 1);

      draggableTemplates.splice(destination.index, 0, removed);

      const sortedData = getReorderedArray(draggableTemplates);

      dispatch(reorderTemplates(sortedData)).unwrap().finally(() => fetchData());
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <PageTitle title="Templates" btnName="Add Template" handleAdd={handleAdd} />
      {(searchTerm || !!templatesList.length) && <SearchSection />}
      {templatesList.length ? templatesList.map(({ id: templateId, title, templates }) => (
        <Box mb="32px" key={templateId}>
          <Typography variant="h5" mb="16px">{ title}</Typography>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
              {(providedDroppable: DroppableProvided) => {
                return (
                  <Box
                    {...providedDroppable.droppableProps}
                    ref={providedDroppable.innerRef}
                  >
                    <StyledTable headCells={headSliderCells}>
                      {templates.map(({ name, id, templateCategory }, index) => (
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
                                gridTemplateColumns="auto 282px  140px 150px"
                              >
                                <TableCell>
                                  <RowTitle title={name} path={`/products/templates/edit/${id}`} />
                                </TableCell>
                                <TableCell width="282px">
                                  {templateCategory ? templateCategory.name : 'None'}
                                </TableCell>

                                <TableCell width="140px">
                                  <DndBtn providedDraggable={providedDraggable} />
                                </TableCell>
                                <TableCell width="150px">
                                  <DeleteBtn
                                    deleteAction={() => deleteAction(id)}
                                    questionText="Are you sure you want to delete this template ?"
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
      )) : (
        <EmptyState
          text={searchTerm ? 'No search results found'
            : 'You don’t have any template, please add new to proceed'}
        />
      )}
    </>
  );
};

export default memo(Templates);
