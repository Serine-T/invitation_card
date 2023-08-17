import { memo, useState } from 'react';

import TableCell from '@mui/material/TableCell';
import { StyledTitleBox } from '@containers/common/StyledTitleBox/styled';
import Typography from '@mui/material/Typography';
import Button from '@containers/common/Button';
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
  Draggable, DroppableProvided,
} from '@hello-pangea/dnd';
import { StyledDraggableRow } from '@containers/common/DraggableRow/styled';

import { headSliderCells, rows } from './helpers';
// TODO: DELETE consoles AFTER IMPLEMENTS and make seprate tables

const BestSeller = () => {
  const navigate = useNavigate();
  const handleAddBanner = () => navigate(PAGE_ROUTES.ADD_BEST_SELLER);
  const handleEditBanner = (id:string) => navigate(`/cms/best-seller/-best-seller/${id}`);
  const deleteAction = () => {
    console.log('deleteAction');
  };

  const [items, setItems] = useState(rows);

  // TODO: add typing

  const onDragEnd = (result: any) => {
    const { destination } = result;

    if (!destination) {
      return;
    }

    const newItems = [...items];
    const [removed] = newItems.splice(result.source.index, 1);

    newItems.splice(result.destination.index, 0, removed);
    setItems(newItems);
  };

  return (
    <>
      <StyledTitleBox>
        <Typography variant="h2">Best Sellers</Typography>
        <Button width="120px" onClick={handleAddBanner}>Add Category</Button>
      </StyledTitleBox>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(providedDroppable: DroppableProvided) => {
            return (
              <Box
                {...providedDroppable.droppableProps}
                ref={providedDroppable.innerRef}
              >
                <StyledTable headCells={headSliderCells}>
                  {items.map(({ category, visibility, id, type }, index) => (

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
                            gridTemplateColumns="auto 174px  84px 246px 68px"
                          >
                            <TableCell>
                              <StyledTypography
                                color="blue"
                                underLine
                                onClick={() => handleEditBanner('14')}
                                variant="body3"
                                cursor="pointer"
                              >
                                {category}
                              </StyledTypography>
                            </TableCell>
                            <TableCell width="174px">{visibility}</TableCell>
                            <TableCell width="84px">{type}</TableCell>
                            <TableCell width="246px">
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
                            <TableCell width="68px">
                              <DeleteBtn
                                deleteAction={deleteAction}
                                questionText="Are you sure you want to delete this banner ?"
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
    </>
  );
};

export default memo(BestSeller);
