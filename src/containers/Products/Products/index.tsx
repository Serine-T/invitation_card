import { memo, useCallback, useEffect } from 'react';

import TableCell from '@mui/material/TableCell';
import PAGE_ROUTES from '@routes/routingEnum';
import DeleteBtn from '@containers/common/Table/components/TablesActions/DeleteAction';
import StyledTable from '@containers/common/Table';
import { DropResult } from '@hello-pangea/dnd';
import DndBtn from '@containers/common/Table/components/TablesActions/DndAction';
import { useAppDispatch, useAppSelector } from '@features/app/hooks';
import Loader from '@containers/common/Loader';
import EmptyState from '@containers/common/EmptyState';
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
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { selectProducts } from '@features/products/selectors';
import { deleteProduct, getAllProducts, reorderProducts } from '@features/products/actions';
import { setProducts } from '@features/products/slice';
import { IProductsSearchInfo } from '@features/products/types';

import { headCells } from './helpers';
import SearchSection from './components/SearchSection';
import { IFiltersForm } from './components/SearchSection/helpers';

const Products = () => {
  const dispatch = useAppDispatch();
  const { data: productsList, isLoading } = useAppSelector(selectProducts);
  const { data: categories, isLoading: categoryLoading } = useAppSelector(selectCategories);

  const location = useLocation();
  const params = queryString.parse(location.search);

  const { searchTerm = '', visibleOnSite: visibleOnSiteQuery = '', category = '' } = params as IFiltersForm;
  const isSearchTerm = searchTerm || visibleOnSiteQuery || category;

  const fetchData = useCallback(() => {
    // TODO: should be returned
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const query = {
      searchTerm: searchTerm as string,
      visibleOnSite: visibleOnSiteQuery as string,
      category,
    };

    dispatch(getAllProducts());
  }, [searchTerm, visibleOnSiteQuery, category, dispatch]);

  const deleteAction = (id: string) => {
    dispatch(deleteProduct(id)).unwrap().then(() => {
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
    const { sortedData, items } = nestedDragSort(result, productsList as IProductsSearchInfo[], 'products');

    dispatch(reorderProducts(sortedData)).unwrap().then(() => {
      dispatch(setProducts(items));
    }).catch(() => fetchData());
  };

  console.log('productsList***', productsList, categories);

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
            {(isSearchTerm || !!productsList?.length) && <SearchSection />}
            {productsList?.length ? (productsList as IProductsSearchInfo[]).map(({
              id: catId, products, title: parentTitle }) => (
                <Box key={catId}>
                  <Typography variant="h5" mb="16px">{parentTitle}</Typography>
                  <DndContainer reordingData={reordingData}>
                    <StyledTable headCells={headCells}>
                      {products.map(({
                        name, quarterhouseProductCode, visibleOnSite, id, productSKU, fouroverProdCode, showInSpotlight,
                      }, index) => (
                        <ReusableDragRow
                          key={id}
                          id={id}
                          index={index}
                          gridTemplateColumns="auto 138px 140px 150px"
                        >
                          {({ providedDraggable }) => (
                            < >
                              <TableCell>{productSKU}</TableCell>
                              <TableCell width="80px">{ quarterhouseProductCode}</TableCell>
                              <TableCell width="152px">{fouroverProdCode}</TableCell>
                              <TableCell width="192px">
                                <RowTitle title={name} path={`/products/products/edit/${id}`} />
                              </TableCell>
                              <TableCell width="76px">{visibleOnSite ? 'Yes' : 'No'}</TableCell>
                              <TableCell width="96px">{showInSpotlight ? 'Yes' : 'No'}</TableCell>
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
