import { memo } from 'react';

import StyledTypography from '@containers/common/StyledTypography';
import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
import { StyledTextButton } from '@containers/common/Button/styled';

import { StyledLogOutBox } from './styled';

const LogOut = () => {
  const name = ' Mark';

  return (
    <StyledLogOutBox direction="row">
      <Typography variant="body3">
        Welcome
        {' '}
        {name}
        ,
      </Typography>
      <StyledTextButton disableRipple variant="text">
        <StyledTypography variant="body3" underLine color="blue" ml="3px">
          Log out
        </StyledTypography>
      </StyledTextButton>

    </StyledLogOutBox>
  );
};

export default memo(LogOut);
