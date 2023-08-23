import { memo } from 'react';

import Typography from '@mui/material/Typography';

import AuthComponent from '..';
import { StyledTitle } from '../styled';

const FailPage = () => (
  <AuthComponent>
    <StyledTitle variant="h5">
      Invalid link
    </StyledTitle>
    <Typography variant="body2">
      Token is invalid.
    </Typography>
  </AuthComponent>
);

export default memo(FailPage);
