import { CSSProperties } from 'react';

import CircularProgress, { CircularProgressProps } from '@mui/material/CircularProgress';

import { StyledBox, StyledOverlay } from './styled';

interface ILoaderProps {
  sx?: CSSProperties;
  color?: CircularProgressProps['color'];
  isLayout?: boolean;
}

const Loader = ({ color = 'primary', sx, isLayout = true }: ILoaderProps) => (
  <StyledBox sx={{ ...sx }} isLayout={isLayout}>
    <StyledOverlay isLayout={isLayout}>
      <CircularProgress color={color} />
    </StyledOverlay>
  </StyledBox>
);

export default Loader;
