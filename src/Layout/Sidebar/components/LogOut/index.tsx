import { memo, useCallback } from 'react';

import StyledTypography from '@containers/common/StyledTypography';
import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
import { StyledTextButton } from '@containers/common/Button/styled';
import { useAppDispatch } from '@features/app/hooks';
import { useNavigate } from 'react-router-dom';
import { logOut } from '@features/auth/slice';
import { PAGE_ROUTES } from '@customTypes/enums/routes';

import { StyledLogOutBox } from './styled';

const LogOut = () => {
  const name = ' Mark';
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleLogOut = useCallback(() => {
    dispatch(logOut());
    navigate(PAGE_ROUTES.SIGN_IN);
  }, [dispatch, navigate]);

  return (
    <StyledLogOutBox direction="row">
      <Typography variant="body3">
        Welcome
        {' '}
        {name}
        ,
      </Typography>
      <StyledTextButton disableRipple variant="text" onClick={handleLogOut}>
        <StyledTypography variant="body3" underLine color="blue" ml="3px">
          Log out
        </StyledTypography>
      </StyledTextButton>

    </StyledLogOutBox>
  );
};

export default memo(LogOut);
