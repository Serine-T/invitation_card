import { memo } from 'react';

import StyledTypography from '@containers/common/StyledTypography';
import Typography from '@mui/material/Typography';

import { StyledLogOutBox } from './styled';

const LogOut = () => {
  const name = ' Mark';

  return (
    <StyledLogOutBox direction="row">
      <Typography>
        Welcome
        {' '}
        {name}
        ,
      </Typography>
      <StyledTypography underLine color="blue" ml="3px">
        Log out
      </StyledTypography>
    </StyledLogOutBox>
  );
};

export default memo(LogOut);
