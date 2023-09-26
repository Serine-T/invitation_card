import { ReactNode, memo } from 'react';

import Typography from '@mui/material/Typography';

import { StyledBox } from './styled';

interface IInputAfterText {
  children: ReactNode;
  label: string;
}

const InputAfterText = ({ children, label }: IInputAfterText) => (
  <StyledBox>
    {children}
    <Typography variant="body3">{label}</Typography>
  </StyledBox>
);

export default memo(InputAfterText);
