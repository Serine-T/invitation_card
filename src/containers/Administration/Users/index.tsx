import { memo, useCallback } from 'react';

import StyledTable from '@containers/common/Table';
import { useNavigate } from 'react-router-dom';
import PAGE_ROUTES from '@routes/routingEnum';
import { StyledTableRow } from '@containers/common/Table/styled';
import StyledTypography from '@containers/common/StyledTypography';
import DeleteBtn from '@containers/common/DeleteAction';
import { useAppDispatch, useAppSelector } from '@features/app/hooks';
import { deleteUser, getAllUsers } from '@features/users/actions';
import { selectUsers } from '@features/users/selectors';
import Loader from '@containers/common/Loader';
import useMount from '@customHooks/useMount';
import PageTitle from '@containers/common/PageTitle';
import EmptyState from '@containers/common/EmptyState';

import { formattedRole, headCells } from './helpers';
import { StyledStatusBtn, StyledTableCell } from './styles';

const Users = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleAddUser = useCallback(() => navigate(PAGE_ROUTES.ADD_USER), []);
  const { data: users, isLoading } = useAppSelector(selectUsers);

  const handleEditUser = (id: string) => navigate(`/administration/users/edit-user/${id}`);
  const deleteAction = useCallback((id: string) => {
    dispatch(deleteUser(id)).unwrap().finally(() => dispatch(getAllUsers()));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useMount(() => {
    dispatch(getAllUsers());
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <PageTitle title="Users" btnName="Add User" handleAdd={handleAddUser} />

      {users.length ? (
        <StyledTable headCells={headCells}>
          { users.map(({ id, email, firstName, lastName, username, isVerified, permissions }) => (
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
              <StyledTableCell>{ formattedRole(permissions)}</StyledTableCell>
              <StyledTableCell>
                <StyledStatusBtn isVerified={isVerified}>
                  {isVerified ? 'Active' : 'Pending'}
                </StyledStatusBtn>
              </StyledTableCell>
              <StyledTableCell>
                <DeleteBtn
                  deleteAction={() => deleteAction(id)}
                  questionText="Are you sure you want to delete this user ?"
                />
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </StyledTable>
      ) : (
        <EmptyState text="You don’t have any users, please add new to proceed" />
      )}
    </>
  );
};

export default memo(Users);
