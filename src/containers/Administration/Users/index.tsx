import { memo } from 'react';

import { StyledTitleBox } from '@containers/common/StyledTitleBox/styled';
import { Typography } from '@mui/material';
import Button from '@containers/common/Button';
import { useConfirm } from 'material-ui-confirm';
import confirmOptionsDialog from '@containers/common/Confirm';
import BackButton from '@containers/common/BackButton';

const Users = () => {
  const confirm = useConfirm();

  const handleAddingUser = async () => {
    await confirm(confirmOptionsDialog({ questionText: 'Are you sure you want to delete this user ?' }));
  };

  return (
    <>
      <StyledTitleBox>
        <Typography variant="h2">Users</Typography>
        <Button width="120px" onClick={handleAddingUser}>Add User</Button>
      </StyledTitleBox>

      <BackButton path="/" />

    </>
  );
};

export default memo(Users);
