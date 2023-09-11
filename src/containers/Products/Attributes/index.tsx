import { memo, useCallback, useEffect } from 'react';

import TableCell from '@mui/material/TableCell';
import PAGE_ROUTES from '@routes/routingEnum';
import StyledTable from '@containers/common/Table';
import DndBtn from '@containers/common/Table/components/TablesActions/DndAction';
import { DropResult } from '@hello-pangea/dnd';
import DndContainer from '@containers/common/Table/components/DndContainer';
import { useAppDispatch, useAppSelector } from '@features/app/hooks';
import Loader from '@containers/common/Loader';
import PageTitle from '@containers/common/PageTitle';
import EmptyState from '@containers/common/EmptyState';
import queryString from 'query-string';
import { reorderAttributes, searchAttributes } from '@features/attributes/actions';
import { selectAttributes } from '@features/attributes/selectors';
import RowTitle from '@containers/common/Table/components/RowTitle';
import { nestedDragSort } from '@containers/common/Table/components/DndContainer/helpers';
import ReusableDragRow from '@containers/common/Table/components/DndContainer/ReusableDragRow';
import { useLocation } from 'react-router-dom';
import { setAttributes } from '@features/attributes/slice';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { IFiltersForm } from './components/SearchSection/helpers';
import SearchSection from './components/SearchSection';
import { headCells } from './helpers';

const Attribute = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const params = queryString.parse(location.search);
  const { searchTerm = '' } = params as IFiltersForm;
  const query = { searchTerm: searchTerm as string };

  const fetchData = useCallback(() => {
    dispatch(searchAttributes(query));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  useEffect(
    () => fetchData(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchTerm],
  );

  const { data: attributesList, isLoading } = useAppSelector(selectAttributes);

  const reordingData = (result: DropResult) => {
    const { sortedData, items } = nestedDragSort(result, attributesList, 'attributes');

    dispatch(reorderAttributes(sortedData)).unwrap()
      .then(() => dispatch(setAttributes(items))).catch(() => fetchData());
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <PageTitle title="Attributes" btnName="Add Attribute" path={PAGE_ROUTES.ADD_ATTRIBUTE} />
      { (searchTerm || !!attributesList.length) && <SearchSection /> }
      {attributesList.length ? attributesList.map(({ id: attributeId, name: attributeName, attributes }) => (
        <Box key={attributeId}>
          <Typography variant="h5" mb="16px">{attributeName}</Typography>
          <DndContainer reordingData={reordingData}>
            <StyledTable headCells={headCells}>
              {attributes.map(({ name, id, nickname }, index) => (
                <ReusableDragRow key={id} id={id} index={index} gridTemplateColumns="auto 260px">
                  {({ providedDraggable }) => (
                    <>
                      <TableCell>
                        <RowTitle title={`${name} / ${nickname}`} path={`/products/attributes/edit/${id}`} />
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
