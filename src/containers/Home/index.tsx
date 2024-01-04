import { memo } from 'react';

import background from '@assets/images/background.png';
import Stack from '@mui/material/Stack';

import MyStepper from './Stepper';
import Map from './Map';
import Timer from './Timer';
import Banner from './Banner';

const Home = () => {
  return (
    <Stack
      sx={{
        height: '100vh',
        width: '100%',
        position: 'fixed',
        zIndex: '1',
        overflow: 'auto',
        backgroundImage: `url(${background})`,
        backgroundPosition: '-150px',
      }}
    >
      <Stack justifyContent="center" alignItems="center" zIndex="1000">
        <Banner />
        <Stack alignItems="center">
          <Timer />
          <MyStepper />
          <Map />
        </Stack>
      </Stack>
    </Stack>

  );
};

export default memo(Home);
