import { memo, useCallback, useEffect } from 'react';

import TableCell from '@mui/material/TableCell';
import { useNavigate } from 'react-router-dom';
import PAGE_ROUTES from '@routes/routingEnum';
import StyledTypography from '@containers/common/StyledTypography';
import DeleteBtn from '@containers/common/DeleteAction';
import StyledTable from '@containers/common/Table';
import DragAndDropIcon from '@containers/common/Icons/DragAndDrop';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import {
  DragDropContext, Droppable,
  Draggable, DroppableProvided, DropResult,
} from '@hello-pangea/dnd';
import { StyledDraggableRow } from '@containers/common/DraggableRow/styled';
import { useAppDispatch, useAppSelector } from '@features/app/hooks';
import {
  deleteSubcategory,
  getAllSubcategories,
  reorderSubcategories,
  searchSubcategories,
} from '@features/subcategories/actions';
import Loader from '@containers/common/Loader';
import { selectSubcategories } from '@features/subcategories/selectors';
import EmptyState from '@containers/common/EmptyState';
import { getReorderedArray } from '@utils/helpers';
import { setSubcategories } from '@features/subcategories/slice';
import queryString from 'query-string';
import useMount from '@customHooks/useMount';
import { getAllCategories } from '@features/categories/actions';
import { selectCategories } from '@features/categories/selectors';
import PageTitle from '@containers/common/PageTitle';

import { headSliderCells } from './helpers';
import SearchSection from './components/SearchSection';
import { IFiltersForm } from './components/SearchSection/helpers';
import { printTypeName } from './components/InputsTable/helpers';

const ProductCategories = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { data: subcategories, isLoading } = useAppSelector(selectSubcategories);
  const { data: categories, isLoading: categoryLoading } = useAppSelector(selectCategories);
  const handleAdd = () => navigate(PAGE_ROUTES.ADD_PRODUCT_CATEGORIES);
  const handleEdit = (id:string) => navigate(`/products/product-categories/edit/${id}`);
  const deleteAction = (id: string) => {
    dispatch(deleteSubcategory(id)).unwrap().then(() => {
      dispatch(getAllSubcategories());
    }).catch(() => {});
  };

  const params = queryString.parse(window.location.search);

  const { searchTerm = '', visibleOnSite: visibleOnSiteQuery = '', category = '' } = params as IFiltersForm;
  const isSearchTerm = searchTerm || visibleOnSiteQuery || category;

  const fetchData = useCallback(() => {
    const query = {
      searchTerm: searchTerm as string,
      visibleOnSite: visibleOnSiteQuery as string,
      category,
    };

    isSearchTerm ? dispatch(searchSubcategories(query)) : dispatch(getAllSubcategories());
  }, [isSearchTerm, searchTerm, visibleOnSiteQuery, category, dispatch]);

  useEffect(
    () => fetchData(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isSearchTerm, searchTerm, visibleOnSiteQuery, category],
  );

  useMount(() => {
    dispatch(getAllCategories());
  });

  const items = [...subcategories];

  const onDragEnd = (result: DropResult) => {
    const { destination } = result;

    if (destination) {
      const [removed] = items.splice(result.source.index, 1);

      items.splice(destination.index, 0, removed);

      const sortedData = getReorderedArray(items);

      dispatch(reorderSubcategories(sortedData)).unwrap().then(() => {
        dispatch(setSubcategories(items));
      }).catch(() => dispatch(getAllSubcategories()));
    }
  };

  if (isLoading || categoryLoading) {
    return <Loader />;
  }

  return (
    <>
      <PageTitle
        title="Product Categories"
        btnName="Add Subcategory"
        handleAdd={handleAdd}
        isShowBtn={!!categories.length}
      />

      {
        categories.length ? (
          <>
            {(isSearchTerm || !!subcategories?.length) && <SearchSection />}
            {subcategories?.length ? (
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable">
                  {(providedDroppable: DroppableProvided) => {
                    return (
                      <Box
                        {...providedDroppable.droppableProps}
                        ref={providedDroppable.innerRef}
                      >
                        <StyledTable headCells={headSliderCells}>
                          {items.map(({ title, visibleOnSite, id, printType }, index) => (
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
                                    gridTemplateColumns="auto 282px 138px 140px 150px"
                                  >
                                    <TableCell>
                                      <StyledTypography
                                        color="blue"
                                        underLine
                                        onClick={() => handleEdit(id)}
                                        variant="body3"
                                        cursor="pointer"
                                      >
                                        {title}
                                      </StyledTypography>
                                    </TableCell>
                                    <TableCell width="282px">{printTypeName(printType)}</TableCell>
                                    <TableCell width="138px">{visibleOnSite ? 'Yes' : 'No'}</TableCell>
                                    <TableCell width="140px">
                                      <Stack direction="row" alignItems="center" {...providedDraggable.dragHandleProps}>
                                        <DragAndDropIcon />
                                        <StyledTypography
                                          color="blue"
                                          variant="body3"
                                          cursor="grab"
                                          ml="8px"
                                        >
                                          Drag to Reorder
                                        </StyledTypography>
                                      </Stack>
                                    </TableCell>
                                    <TableCell width="150px">
                                      <DeleteBtn
                                        deleteAction={() => deleteAction(id)}
                                        questionText="Are you sure you want to delete this subcategory ?"
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
                text={isSearchTerm ? 'No search results found'
                  : 'You don’t have any subcategories, please add new to proceed'}
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

export default memo(ProductCategories);
