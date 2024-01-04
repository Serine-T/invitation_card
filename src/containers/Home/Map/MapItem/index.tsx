/* eslint-disable jsx-a11y/iframe-has-title */
import { memo } from 'react';

import Typography from '@mui/material/Typography';
// import Stack from '@mui/material/Stack';

import { StyledStack } from './styled';

interface IMapItem {
  id: string;
  title: string;
  src: string;
  isEven: boolean;
}

const MapItem = ({ id, title, src, isEven }: IMapItem) => (
  <StyledStack id={id} direction={isEven ? 'row' : 'row'} alignItems="center" gap="20px">
    <Typography variant="h8" minWidth="250px" textAlign="center">
      {title}
    </Typography>
    <iframe
      src={src}
      width="500"
      height="300"
      style={{ border: 0 }}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  </StyledStack>
);

export default memo(MapItem);
