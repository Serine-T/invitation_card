import { memo } from 'react';

import Stack from '@mui/material/Stack';
// import Typography from '@mui/material/Typography';

import MyStepper from './Stepper';
import Map from './Map';
import Timer from './Timer';
import Banner from './Banner';

const Home = () => {
  return (
    <Stack justifyContent="center" alignItems="center">
      {/* <Typography variant="h2" textTransform="uppercase">Save the date</Typography> */}
      <Banner />
      <Stack>
        <Timer />
        <MyStepper />
        <Map />

      </Stack>
    </Stack>
  );
};

export default memo(Home);
