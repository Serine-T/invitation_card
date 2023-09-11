import { memo } from 'react';

import StyledTable from '@containers/common/Table';
import PAGE_ROUTES from '@routes/routingEnum';
import { StyledTableRow } from '@containers/common/Table/styled';
import { useAppDispatch, useAppSelector } from '@features/app/hooks';
import { getAllUsers } from '@features/users/actions';
import { selectUsers } from '@features/users/selectors';
import Loader from '@containers/common/Loader';
import useMount from '@customHooks/useMount';
import PageTitle from '@containers/common/PageTitle';
import EmptyState from '@containers/common/EmptyState';
import TableCell from '@mui/material/TableCell';
import Input from '@containers/common/Input';

import { headCells } from './helpers';

const MailingServiceFees = () => {
  const dispatch = useAppDispatch();

  const { data: users, isLoading } = useAppSelector(selectUsers);

  useMount(() => {
    dispatch(getAllUsers());
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <PageTitle
        title="Mailing Service Fees"
        btnName="Add Mailing Service Fees"
        path={PAGE_ROUTES.MAILING_SERVICE_FEES}
      />

      {users.length ? (
        <StyledTable headCells={headCells}>
          { users.map(({ id }) => (
            <StyledTableRow key={id}>
              <TableCell>
                <Input width="120px" />
              </TableCell>
              <TableCell><Input width="120px" /></TableCell>
              <TableCell><Input width="120px" /></TableCell>
              <TableCell><Input width="120px" /></TableCell>
              <TableCell><Input width="120px" /></TableCell>
            </StyledTableRow>
          ))}
        </StyledTable>
      ) : (
        <EmptyState text="You don’t have any mailing service fees, please add new to proceed" />
      )}
    </>
  );
};

export default memo(MailingServiceFees);
