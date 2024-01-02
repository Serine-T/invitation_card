import { memo } from 'react';

import Stack from '@mui/material/Stack';

import { mapInfo } from './data';
import MapItem from './MapItem';

const Map = () => (
  <Stack justifyContent="center" gap="20px">
    {mapInfo.map((item, idx) => (
      <MapItem key={item.id} {...item} isEven={idx % 2 === 0} />
    ))}
  </Stack>
);

export default memo(Map);
