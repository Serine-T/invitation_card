import { CSSProperties } from 'react';

import CircularProgress, { CircularProgressProps } from '@mui/material/CircularProgress';

import { StyledBox } from './styled';

interface ILoaderProps {
  sx?: CSSProperties;
  color?: CircularProgressProps['color'];
}

const Loader = ({ color = 'primary', sx }: ILoaderProps) => (
  <StyledBox sx={{ ...sx }}>
    <CircularProgress color={color} />
  </StyledBox>
);

export default Loader;
