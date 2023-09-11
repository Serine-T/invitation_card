import { memo, useEffect } from 'react';

import TableCell from '@mui/material/TableCell';
import PAGE_ROUTES from '@routes/routingEnum';
import StyledTable from '@containers/common/Table';
import DndBtn from '@containers/common/Table/components/TablesActions/DndAction';
import DeleteBtn from '@containers/common/Table/components/TablesActions/DeleteAction';
import { DropResult } from '@hello-pangea/dnd';
import { useAppDispatch, useAppSelector } from '@features/app/hooks';
import Loader from '@containers/common/Loader';
import PageTitle from '@containers/common/PageTitle';
import EmptyState from '@containers/common/EmptyState';
import queryString from 'query-string';
import {
  deleteTemplateCategory,
  getAllTemplateCategories, reorderTemplateCategories, searchTemplateCategories,
} from '@features/templateCategories/actions';
import { selectTemplateCategories } from '@features/templateCategories/selectors';
import RowTitle from '@containers/common/Table/components/RowTitle';
import { dragSort } from '@containers/common/Table/components/DndContainer/helpers';
import DndContainer from '@containers/common/Table/components/DndContainer';
import ReusableDragRow from '@containers/common/Table/components/DndContainer/ReusableDragRow';
import { useLocation } from 'react-router-dom';
import { setTemplateCategories } from '@features/templateCategories/slice';

import { headCells } from './helpers';
import SearchSection from './components/SearchSection';
import { IFiltersForm } from './components/SearchSection/helpers';

const TemplateCategories = () => {
  const dispatch = useAppDispatch();
  const { data: templateCategories, isLoading } = useAppSelector(selectTemplateCategories);

  const location = useLocation();
  const params = queryString.parse(location.search);
  const { searchTerm = '' } = params as IFiltersForm;
  const query = {
    searchTerm: searchTerm as string,
  };

  const fetchData = () => {
    searchTerm ? dispatch(searchTemplateCategories(query)) : dispatch(getAllTemplateCategories());
  };

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

  const reordingData = (result: DropResult) => {
    const { sortedData, items } = dragSort(result, templateCategories);

    dispatch(reorderTemplateCategories(sortedData)).unwrap().then(() => {
      dispatch(setTemplateCategories(items));
    }).catch(() => dispatch(getAllTemplateCategories()));
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <PageTitle title="Template Categories" btnName="Add Template Category" path={PAGE_ROUTES.ADD_TEMPLATE_CATEGORY} />
      { (searchTerm || !!templateCategories.length) && <SearchSection /> }
      {templateCategories.length ? (
        <DndContainer reordingData={reordingData}>
          <StyledTable headCells={headCells}>
            {templateCategories.map(({ name, id }, index) => (
              <ReusableDragRow key={id} id={id} index={index} gridTemplateColumns="auto 140px  150px">
                {({ providedDraggable }) => (
                  <>
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
                  </>
                )}
              </ReusableDragRow>
            ))}
          </StyledTable>
        </DndContainer>
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
