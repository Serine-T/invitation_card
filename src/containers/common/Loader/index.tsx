import { CSSProperties } from 'react';

import CircularProgress, { CircularProgressProps } from '@mui/material/CircularProgress';

import { StyledBox, StyledOverlay } from './styled';

interface ILoaderProps {
  sx?: CSSProperties;
  color?: CircularProgressProps['color'];
}

const Loader = ({ color = 'primary', sx }: ILoaderProps) => (
  <StyledBox sx={{ ...sx }}>
    <StyledOverlay>
      <CircularProgress color={color} />
    </StyledOverlay>
  </StyledBox>
);

export default Loader;
