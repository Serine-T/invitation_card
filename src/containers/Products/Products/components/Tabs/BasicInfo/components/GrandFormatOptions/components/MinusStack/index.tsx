import { memo } from 'react';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const MinusStack = () => (
  <Stack direction="row" alignItems="center" height="36px">
    <Typography>--</Typography>
  </Stack>
);

export default memo(MinusStack);
