import { memo } from 'react';

import { StyledTitleBox } from '@containers/common/StyledTitleBox/styled';
import { Typography } from '@mui/material';
import Button from '@containers/common/Button';
import { useConfirm } from 'material-ui-confirm';
import confirmOptionsDialog from '@containers/common/Confirm';
import { useNavigate } from 'react-router-dom';
import PAGE_ROUTES from '@routes/routingEnum';

const Users = () => {
  const confirm = useConfirm();
  const navigate = useNavigate();
  // TODO: Use this logic in other page and delete after that
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleAddingUser = async () => {
    await confirm(confirmOptionsDialog({ questionText: 'Are you sure you want to delete this user ?' }));
  };

  const handleAddUser = () => navigate(PAGE_ROUTES.ADD_USER);

  return (
    <>
      <StyledTitleBox>
        <Typography variant="h2">Users</Typography>
        <Button width="120px" onClick={handleAddUser}>Add User</Button>
      </StyledTitleBox>
    </>
  );
};

export default memo(Users);
