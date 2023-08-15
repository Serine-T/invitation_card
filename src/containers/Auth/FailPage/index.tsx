import { memo } from 'react';

import Typography from '@mui/material/Typography';

import AuthComponent from '..';
import { StyledTitle } from '../styled';

const FailPage = () => (
  <AuthComponent>
    <StyledTitle variant="h5">
      The link has been used
    </StyledTitle>
    <Typography variant="body2">
      The link you are looking for has been used.
    </Typography>
  </AuthComponent>
);

export default memo(FailPage);
