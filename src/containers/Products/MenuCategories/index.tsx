import { memo, useCallback, useEffect } from 'react';

import TableCell from '@mui/material/TableCell';
import PAGE_ROUTES from '@routes/routingEnum';
import DeleteBtn from '@containers/common/Table/components/TablesActions/DeleteAction';
import StyledTable from '@containers/common/Table';
import DndBtn from '@containers/common/Table/components/TablesActions/DndAction';
import { DropResult } from '@hello-pangea/dnd';
import { useAppDispatch, useAppSelector } from '@features/app/hooks';
import { deleteCategory, getAllCategories, reorderCategories, searchCategories } from '@features/categories/actions';
import { selectCategories } from '@features/categories/selectors';
import Loader from '@containers/common/Loader';
import PageTitle from '@containers/common/PageTitle';
import EmptyState from '@containers/common/EmptyState';
import queryString from 'query-string';
import RowTitle from '@containers/common/Table/components/RowTitle';
import { useLocation } from 'react-router-dom';
import { dragSort } from '@containers/common/Table/components/DndContainer/helpers';
import DndContainer from '@containers/common/Table/components/DndContainer';
import ReusableDragRow from '@containers/common/Table/components/DndContainer/ReusableDragRow';
import { setCategories } from '@features/categories/slice';

import { headSliderCells } from './helpers';
import SearchSection from './components/SearchSection';
import { IFiltersForm } from './components/SearchSection/helpers';

const MenuCategories = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const params = queryString.parse(location.search);
  const { searchTerm = '', displayInHeader: displayInHeaderQuery = '' } = params as IFiltersForm;
  const isSearchTerm = searchTerm || displayInHeaderQuery;

  const fetchData = useCallback(() => {
    const query = {
      searchTerm: searchTerm as string,
      displayInHeader: displayInHeaderQuery as string,
    };

    isSearchTerm ? dispatch(searchCategories(query)) : dispatch(getAllCategories());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSearchTerm]);

  useEffect(
    () => fetchData(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isSearchTerm, searchTerm, displayInHeaderQuery],
  );

  const deleteAction = (id: string) => {
    dispatch(deleteCategory(id)).unwrap().then(() => {
      dispatch(getAllCategories());
    }).catch(() => {});
  };

  const { data: categories, isLoading } = useAppSelector(selectCategories);

  const reordingData = (result: DropResult) => {
    const { sortedData, items } = dragSort(result, categories);

    dispatch(reorderCategories(sortedData)).unwrap().then(() => {
      dispatch(setCategories(items));
    }).catch(() => dispatch(getAllCategories()));
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <PageTitle title="Menu Categories" btnName="Add Category" path={PAGE_ROUTES.ADD_MENU_CATEGORY} />
      { (isSearchTerm || !!categories.length) && <SearchSection /> }
      {categories.length ? (
        <DndContainer reordingData={reordingData}>
          <StyledTable headCells={headSliderCells}>
            {categories.map(({ title, displayInHeader, id }, index) => (
              <ReusableDragRow key={id} id={id} index={index} gridTemplateColumns="auto 225px 140px 150px">
                {({ providedDraggable }) => (
                  <>
                    <TableCell>
                      <RowTitle title={title} path={`/products/menu-categories/edit/${id}`} />
                    </TableCell>
                    <TableCell width="225px">{displayInHeader ? 'Yes' : 'No'}</TableCell>
                    <TableCell width="140px">
                      <DndBtn providedDraggable={providedDraggable} />
                    </TableCell>
                    <TableCell width="150px">
                      <DeleteBtn
                        deleteAction={() => deleteAction(id)}
                        questionText="Are you sure you want to delete this category ?"
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
          text={isSearchTerm ? 'No search results found'
            : 'You don’t have any categories, please add new to proceed'}
        />
      )}
    </>
  );
};

export default memo(MenuCategories);
