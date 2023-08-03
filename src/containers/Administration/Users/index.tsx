import { memo } from 'react';

import { StyledTitleBox } from '@containers/common/StyledTitleBox/styled';
import Typography from '@mui/material/Typography';
import Button from '@containers/common/Button';
import StyledTable from '@containers/common/Table';
import { useNavigate } from 'react-router-dom';
import PAGE_ROUTES from '@routes/routingEnum';
import { StyledTableRow } from '@containers/common/Table/styled';
import StyledTypography from '@containers/common/StyledTypography';
import DeleteBtn from '@containers/common/DeleteAction';

import { headCells, rows } from './helpers';
import { StyledStatusBtn, StyledTableCell } from './styles';

const Users = () => {
  const navigate = useNavigate();

  const handleAddUser = () => navigate(PAGE_ROUTES.ADD_USER);

  const handleEditUser = (id: string) => navigate(`/administration/users/edit-user/${id}`);
  const deleteAction = () => {
    console.log('deleteAction');
  };

  return (
    <>
      <StyledTitleBox>
        <Typography variant="h2">Users</Typography>
        <Button width="120px" onClick={handleAddUser}>Add User</Button>
      </StyledTitleBox>
      <StyledTable headCells={headCells}>
        {rows.map(({ name, calories, fat, carbs }) => (
          <StyledTableRow key={name}>
            <StyledTableCell>
              <StyledTypography
                color="blue"
                underLine
                onClick={() => handleEditUser('14')}
                variant="body3"
                cursor
              >
                {name}
              </StyledTypography>
            </StyledTableCell>
            <StyledTableCell>{calories}</StyledTableCell>
            <StyledTableCell>{fat}</StyledTableCell>
            <StyledTableCell>{calories}</StyledTableCell>
            <StyledTableCell>
              <StyledStatusBtn status={carbs}>
                {carbs}
              </StyledStatusBtn>
            </StyledTableCell>
            <StyledTableCell>
              <DeleteBtn
                deleteAction={deleteAction}
                questionText="Are you sure you want to delete this user ?"
              />
            </StyledTableCell>
          </StyledTableRow>
        ))}
      </StyledTable>
    </>
  );
};

export default memo(Users);
