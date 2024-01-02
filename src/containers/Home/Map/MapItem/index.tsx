/* eslint-disable jsx-a11y/iframe-has-title */
import { memo } from 'react';

import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

interface IMapItem {
  id: string;
  title: string;
  src: string;
  isEven: boolean;
}

const MapItem = ({ id, title, src, isEven }: IMapItem) => (
  <Stack id={id} direction={isEven ? 'row' : 'row-reverse'} alignItems="center" gap="20px">
    <Typography variant="h8">
      {title}
    </Typography>
    <iframe
      src={src}
      width="360"
      height="300"
      style={{ border: 0 }}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />

  </Stack>
);

export default memo(MapItem);
