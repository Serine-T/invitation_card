import { memo, useCallback, useEffect } from 'react';

import TableCell from '@mui/material/TableCell';
import PAGE_ROUTES from '@routes/routingEnum';
import DeleteBtn from '@containers/common/Table/components/TablesActions/DeleteAction';
import StyledTable from '@containers/common/Table';
import { DropResult } from '@hello-pangea/dnd';
import DndBtn from '@containers/common/Table/components/TablesActions/DndAction';
import { useAppDispatch, useAppSelector } from '@features/app/hooks';
import {
  deleteSubcategory,
  reorderSubcategories,
  searchSubcategories,
} from '@features/subcategories/actions';
import Loader from '@containers/common/Loader';
import { selectSubcategories } from '@features/subcategories/selectors';
import EmptyState from '@containers/common/EmptyState';
import { setSubcategories } from '@features/subcategories/slice';
import queryString from 'query-string';
import useMount from '@customHooks/useMount';
import { getAllCategories } from '@features/categories/actions';
import { selectCategories } from '@features/categories/selectors';
import PageTitle from '@containers/common/PageTitle';
import RowTitle from '@containers/common/Table/components/RowTitle';
import { useLocation } from 'react-router-dom';
import { nestedDragSort } from '@containers/common/Table/components/DndContainer/helpers';
import DndContainer from '@containers/common/Table/components/DndContainer';
import ReusableDragRow from '@containers/common/Table/components/DndContainer/ReusableDragRow';
import { ISubcategoriesSearchInfo } from '@features/subcategories/types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { headCells } from './helpers';
import SearchSection from './components/SearchSection';
import { IFiltersForm } from './components/SearchSection/helpers';
import { printTypeName } from './components/InputsTable/helpers';

const Products = () => {
  const dispatch = useAppDispatch();
  const { data: subcategories, isLoading } = useAppSelector(selectSubcategories);
  const { data: categories, isLoading: categoryLoading } = useAppSelector(selectCategories);

  const location = useLocation();
  const params = queryString.parse(location.search);

  const { searchTerm = '', visibleOnSite: visibleOnSiteQuery = '', category = '' } = params as IFiltersForm;
  const isSearchTerm = searchTerm || visibleOnSiteQuery || category;

  const fetchData = useCallback(() => {
    const query = {
      searchTerm: searchTerm as string,
      visibleOnSite: visibleOnSiteQuery as string,
      category,
    };

    dispatch(searchSubcategories(query));
  }, [searchTerm, visibleOnSiteQuery, category, dispatch]);

  const deleteAction = (id: string) => {
    dispatch(deleteSubcategory(id)).unwrap().then(() => {
      fetchData();
    }).catch(() => {});
  };

  useEffect(
    () => fetchData(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isSearchTerm],
  );

  useMount(() => {
    dispatch(getAllCategories());
  });

  const reordingData = (result: DropResult) => {
    const { sortedData, items } = nestedDragSort(result, subcategories as ISubcategoriesSearchInfo[], 'subCategory');

    dispatch(reorderSubcategories(sortedData)).unwrap().then(() => {
      dispatch(setSubcategories(items));
    }).catch(() => fetchData());
  };

  if (isLoading || categoryLoading) {
    return <Loader />;
  }

  return (
    <>
      <PageTitle
        title="Products"
        btnName="Add Product"
        path={PAGE_ROUTES.ADD_PRODUCTS}
        isShowBtn={!!categories.length}
      />
      {
        categories.length ? (
          <>
            {(isSearchTerm || !!subcategories?.length) && <SearchSection />}
            {subcategories?.length ? (subcategories as ISubcategoriesSearchInfo[]).map(({
              id: catId, subCategory, title: catTitle }) => (
                <Box key={catId}>
                  <Typography variant="h5" mb="16px">{catTitle}</Typography>
                  <DndContainer reordingData={reordingData}>
                    <StyledTable headCells={headCells}>
                      {subCategory.map(({ title, visibleOnSite, id, printType }, index) => (
                        <ReusableDragRow
                          key={id}
                          id={id}
                          index={index}
                          gridTemplateColumns="auto 282px 138px 140px 150px"
                        >
                          {({ providedDraggable }) => (
                            < >
                              <TableCell>
                                <RowTitle title={title} path={`/products/products/edit/${id}`} />
                              </TableCell>
                              <TableCell width="282px">{printTypeName(printType)}</TableCell>
                              <TableCell width="138px">{visibleOnSite ? 'Yes' : 'No'}</TableCell>
                              <TableCell width="140px">
                                <DndBtn providedDraggable={providedDraggable} />
                              </TableCell>
                              <TableCell width="150px">
                                <DeleteBtn
                                  deleteAction={() => deleteAction(id)}
                                  questionText="Are you sure you want to delete this product ?"
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
                text={isSearchTerm ? 'No search results found'
                  : 'You don’t have any products, please add new to proceed'}
              />
            )}
          </>
        ) : (
          <EmptyState
            text="You don’t have any categories, please add new to proceed"
          />
        )
      }
    </>
  );
};

export default memo(Products);
