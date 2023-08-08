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
import useMount from '@customHooks/useMount';
import { useAppDispatch, useAppSelector } from '@features/app/hooks';
import { getAllUsers } from '@features/users/actions';
import { selectUsers } from '@features/users/selectors';
import Loader from '@containers/common/Loader';

import { headCells } from './helpers';
import { StyledStatusBtn, StyledTableCell } from './styles';

const Users = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleAddUser = () => navigate(PAGE_ROUTES.ADD_USER);
  const { data: users, isLoading } = useAppSelector(selectUsers);

  console.log('users', users);

  const handleEditUser = (id: string) => navigate(`/administration/users/edit-user/${id}`);
  const deleteAction = () => {
    console.log('deleteAction');
  };

  useMount(() => {
    dispatch(getAllUsers());
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <StyledTitleBox>
        <Typography variant="h2">Users</Typography>
        <Button width="120px" onClick={handleAddUser}>Add User</Button>
      </StyledTitleBox>
      {users.length ? (
        <StyledTable headCells={headCells}>
          { users.map(({ id, email, firstName, lastName, username, isVerified }) => (
            <StyledTableRow key={id}>
              <StyledTableCell>
                <StyledTypography
                  color="blue"
                  underLine
                  onClick={() => handleEditUser(id)}
                  variant="body3"
                  cursor="pointer"
                >
                  {username}
                </StyledTypography>
              </StyledTableCell>
              <StyledTableCell>{`${firstName} ${lastName}`}</StyledTableCell>
              <StyledTableCell>{email}</StyledTableCell>
              <StyledTableCell>superadmin</StyledTableCell>
              <StyledTableCell>
                <StyledStatusBtn isVerified={isVerified}>
                  {isVerified ? 'Active' : 'Pending'}
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
      ) : <>Empty state</>}

    </>
  );
};

export default memo(Users);
