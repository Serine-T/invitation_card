import { memo, useCallback, useEffect } from 'react';

import DeleteBtn from '@containers/common/Table/components/TablesActions/DeleteAction';
import TableCell from '@mui/material/TableCell';
import PAGE_ROUTES from '@routes/routingEnum';
import StyledTable from '@containers/common/Table';
import DndBtn from '@containers/common/Table/components/TablesActions/DndAction';
import Box from '@mui/material/Box';
import { DropResult } from '@hello-pangea/dnd';
import { useAppDispatch, useAppSelector } from '@features/app/hooks';
import Loader from '@containers/common/Loader';
import PageTitle from '@containers/common/PageTitle';
import EmptyState from '@containers/common/EmptyState';
import queryString from 'query-string';
import {
  deleteTemplate,
  reorderTemplates, searchTemplates,
} from '@features/templates/actions';
import { selectTemplates } from '@features/templates/selectors';
import { Typography } from '@mui/material';
import RowTitle from '@containers/common/Table/components/RowTitle';
import { nestedDragSort } from '@containers/common/Table/components/DndContainer/helpers';
import DndContainer from '@containers/common/Table/components/DndContainer';
import ReusableDragRow from '@containers/common/Table/components/DndContainer/ReusableDragRow';
import { useLocation } from 'react-router-dom';

import { headSliderCells } from './helpers';
import SearchSection from './components/SearchSection';
import { IFiltersForm } from './components/SearchSection/helpers';

const Templates = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const params = queryString.parse(location.search);
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

  const deleteAction = (id: string) => {
    dispatch(deleteTemplate(id)).unwrap().then(() => {
      fetchData();
    }).catch(() => {});
  };

  const { data: templatesList, isLoading } = useAppSelector(selectTemplates);

  const reordingData = useCallback((result: DropResult) => {
    const sortedData = nestedDragSort(result, templatesList, 'templates');

    if (sortedData) {
      dispatch(reorderTemplates(sortedData)).unwrap().finally(() => fetchData());
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <PageTitle title="Templates" btnName="Add Template" path={PAGE_ROUTES.ADD_TEMPLATE} />
      {(searchTerm || !!templatesList.length) && <SearchSection />}
      {templatesList.length ? templatesList.map(({ id: templateId, title, templates }) => (
        <Box mb="32px" key={templateId}>
          <Typography variant="h5" mb="16px">{ title}</Typography>
          <DndContainer reordingData={reordingData}>
            <StyledTable headCells={headSliderCells}>
              {templates.map(({ name, id, templateCategory }, index) => (
                <ReusableDragRow key={id} id={id} index={index} gridTemplateColumns="auto 282px  140px 150px">
                  {({ providedDraggable }) => (
                    <>
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
                    </>
                  )}
                </ReusableDragRow>
              ))}
            </StyledTable>
          </DndContainer>
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
