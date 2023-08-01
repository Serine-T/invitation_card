import { memo } from 'react';

import { StyledTitleBox } from '@containers/common/StyledTitleBox/styled';
import Typography from '@mui/material/Typography';

const AddBanner = () => {
  return (
    <>
      <StyledTitleBox>
        <Typography variant="h2">Add Banner</Typography>
      </StyledTitleBox>
    </>
  );
};

export default memo(AddBanner);
