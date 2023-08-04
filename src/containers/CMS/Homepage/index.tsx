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

import { headBannerCells, headSliderCells, rows } from './helpers';
import { StyledDraggableRow } from './styled';
// TODO: DELETE consoles AFTER IMPLEMENTS and make seprate tables

const Homepage = () => {
  const navigate = useNavigate();
  // const theme = useTheme();
  const handleAddBanner = () => navigate(PAGE_ROUTES.ADD_BANNER);
  const handleEditBanner = (id:string) => navigate(`/cms/homepage/edit-banner/${id}`);
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
        <Typography variant="h2">Homepage</Typography>
        <Button width="120px" onClick={handleAddBanner}>Add Banner</Button>
      </StyledTitleBox>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(providedDroppable: DroppableProvided) => {
            return (
              <Box
                {...providedDroppable.droppableProps}
                ref={providedDroppable.innerRef}
              >
                <StyledTable headCells={headSliderCells} hasPagination={false}>
                  {items.map(({ slider, visibility, id }, index) => (

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
                          >
                            <TableCell>
                              <StyledTypography
                                color="blue"
                                underLine
                                onClick={() => handleEditBanner('14')}
                                variant="body3"
                                cursor
                              >
                                {slider}
                              </StyledTypography>
                            </TableCell>
                            <TableCell width="227px">{visibility}</TableCell>
                            <TableCell width="148px">
                              <Stack direction="row" alignItems="center" {...providedDraggable.dragHandleProps}>
                                <DragAndDropIcon />
                                <StyledTypography
                                  color="blue"
                                  variant="body3"
                                  cursor
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

      <Box mt="40px">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable" isCombineEnabled={false}>
            {(providedDroppable: DroppableProvided) => (
              <Box
                {...providedDroppable.droppableProps}
                ref={providedDroppable.innerRef}
              >
                <StyledTable headCells={headBannerCells} hasPagination={false}>
                  {items.map(({ slider, visibility, id }, index) => (

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
                          >
                            <TableCell>
                              <StyledTypography
                                color="blue"
                                underLine
                                onClick={() => handleEditBanner('14')}
                                variant="body3"
                                cursor
                              >
                                {slider}
                              </StyledTypography>
                            </TableCell>
                            <TableCell width="227px">{visibility}</TableCell>
                            <TableCell width="148px">
                              <Stack direction="row" alignItems="center" {...providedDraggable.dragHandleProps}>
                                <DragAndDropIcon />
                                <StyledTypography
                                  color="blue"
                                  variant="body3"
                                  cursor
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
            )}
          </Droppable>
        </DragDropContext>
      </Box>
    </>
  );
};

export default memo(Homepage);
