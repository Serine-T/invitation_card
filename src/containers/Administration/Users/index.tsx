import { memo } from 'react';

import { StyledTitleBox } from '@containers/common/StyledTitleBox/styled';
import { Typography } from '@mui/material';
import Button from '@containers/common/Button';

const Users = () => {
  return (
    <>
      <StyledTitleBox>
        <Typography variant="h2">Users</Typography>
        <Button width="120px">Add User</Button>
      </StyledTitleBox>

    </>
  );
};

export default memo(Users);
