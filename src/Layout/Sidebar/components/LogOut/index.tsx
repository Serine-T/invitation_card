import { memo } from 'react';

import StyledTypography from '@containers/common/StyledTypography';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

const LogOut = () => {
  const name = ' Mark';

  return (
    <Stack direction="row">
      <Typography>
        Welcome
        {' '}
        {name}
        ,
      </Typography>
      <StyledTypography underLine color="blue" ml="3px">
        Log out
      </StyledTypography>
    </Stack>
  );
};

export default memo(LogOut);
