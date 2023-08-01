import { memo } from 'react';

import TableCell from '@mui/material/TableCell';
import { StyledTitleBox } from '@containers/common/StyledTitleBox/styled';
import Typography from '@mui/material/Typography';
import Button from '@containers/common/Button';
import { useNavigate } from 'react-router-dom';
import PAGE_ROUTES from '@routes/routingEnum';
import { StyledTableRow } from '@containers/common/Table/styled';
import StyledTypography from '@containers/common/StyledTypography';
import DeleteBtn from '@containers/common/DeleteAction';
import StyledTable from '@containers/common/Table';
import DragAndDropIcon from '@containers/common/Icons/DragAndDrop';
import Stack from '@mui/material/Stack';

import { headCells, rows } from './helpers';

const Homepage = () => {
  const navigate = useNavigate();

  const handleAddBanner = () => navigate(PAGE_ROUTES.ADD_BANNER);
  const handleEditBanner = () => navigate(PAGE_ROUTES.EDIT_BANNER);
  const deleteAction = () => {
    console.log('deleteAction');
  };

  return (
    <>
      <StyledTitleBox>
        <Typography variant="h2">Homepage</Typography>
        <Button width="120px" onClick={handleAddBanner}>Add Banner</Button>
      </StyledTitleBox>
      <StyledTable headCells={headCells} hasPagination={false}>
        {rows.map(({ slider, visibility }) => (
          <StyledTableRow key={slider}>
            <TableCell>
              <StyledTypography
                color="blue"
                underLine
                onClick={handleEditBanner}
                variant="body3"
                cursor
              >
                {slider}
              </StyledTypography>
            </TableCell>
            <TableCell width="227px">{visibility}</TableCell>
            <TableCell width="148px">
              <Stack direction="row" alignItems="center">
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
              <StyledTypography
                color="blue"
                onClick={handleEditBanner}
                variant="body3"
                cursor
              >
                Edit
              </StyledTypography>
            </TableCell>
            <TableCell width="68px">
              <DeleteBtn
                deleteAction={deleteAction}
                questionText="Are you sure you want to delete this banner ?"
              />
            </TableCell>
          </StyledTableRow>
        ))}
      </StyledTable>
    </>
  );
};

export default memo(Homepage);
