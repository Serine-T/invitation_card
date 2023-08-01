import { memo } from 'react';

import { StyledTitleBox } from '@containers/common/StyledTitleBox/styled';
import Typography from '@mui/material/Typography';
import Button from '@containers/common/Button';
import { useNavigate } from 'react-router-dom';
import PAGE_ROUTES from '@routes/routingEnum';

const EditBanner = () => {
  const navigate = useNavigate();

  const handleEditBanner = () => navigate(PAGE_ROUTES.ADD_BANNER);

  return (
    <>
      <StyledTitleBox>
        <Typography variant="h2">Add Banner</Typography>
        <Button width="120px" onClick={handleEditBanner}>Add User</Button>
      </StyledTitleBox>
    </>
  );
};

export default memo(EditBanner);
