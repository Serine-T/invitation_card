import { memo, useCallback, useEffect } from 'react';

import TableCell from '@mui/material/TableCell';
import PAGE_ROUTES from '@routes/routingEnum';
import StyledTable from '@containers/common/Table';
import { DropResult } from '@hello-pangea/dnd';
import { useAppDispatch, useAppSelector } from '@features/app/hooks';
import Loader from '@containers/common/Loader';
import PageTitle from '@containers/common/PageTitle';
import EmptyState from '@containers/common/EmptyState';
import queryString from 'query-string';
import {
  getAllAttributeCategories, reorderAttributeCategories, searchAttributeCategories,
} from '@features/attributeCategories/actions';
import { selectAttributeCategories } from '@features/attributeCategories/selectors';
import DndBtn from '@containers/common/Table/components/TablesActions/DndAction';
import RowTitle from '@containers/common/Table/components/RowTitle';
import DndContainer from '@containers/common/Table/components/DndContainer';
import ReusableDragRow from '@containers/common/Table/components/DndContainer/ReusableDragRow';
import { dragSort } from '@containers/common/Table/components/DndContainer/helpers';
import { useLocation } from 'react-router-dom';

import { headSliderCells } from './helpers';
import SearchSection from './components/SearchSection';
import { IFiltersForm } from './components/SearchSection/helpers';

const AttributeCategories = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const params = queryString.parse(location.search);
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

  const { data: attributeCategories, isLoading } = useAppSelector(selectAttributeCategories);

  const reordingData = (result: DropResult) => {
    const sortedData = dragSort(result, attributeCategories);

    dispatch(reorderAttributeCategories(sortedData)).unwrap().then(() => {
      dispatch(getAllAttributeCategories());
    }).catch(() => dispatch(getAllAttributeCategories()));
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <PageTitle
        title="Attribute Categories"
        btnName="Add Attribute Category"
        path={PAGE_ROUTES.ADD_ATTRIBUTE_CATEGORIES}
      />
      { (searchTerm || !!attributeCategories.length) && <SearchSection /> }
      {attributeCategories.length ? (
        <DndContainer reordingData={reordingData}>
          <StyledTable headCells={headSliderCells}>
            {attributeCategories.map(({ name, id }, index) => (
              <ReusableDragRow id={id} index={index} gridTemplateColumns="auto 260px">
                {({ providedDraggable }) => (
                  <>
                    <TableCell>
                      <RowTitle title={name} path={`/products/attribute-categories/edit/${id}`} />
                    </TableCell>
                    <TableCell width="260px">
                      <DndBtn providedDraggable={providedDraggable} />
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
            : 'You don’t have any attribute categories, please add new to proceed'}
        />
      )}
    </>
  );
};

export default memo(AttributeCategories);
