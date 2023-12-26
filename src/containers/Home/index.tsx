import { memo } from 'react';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import MyStepper from './Stepper';
import Map from './Map';
import Timer from './Timer';

const Home = () => {
  return (
    <Stack justifyContent="center" alignItems="center">
      <Typography variant="h2" textTransform="uppercase">Save the date</Typography>
      <Timer />
      <MyStepper />
      <Map />
    </Stack>
  );
};

export default memo(Home);
