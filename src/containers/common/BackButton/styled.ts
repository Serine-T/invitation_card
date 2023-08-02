import { styled } from '@mui/material/styles';

import { StyledTextButton } from '../Button/styled';

export const StyledBackBox = styled(StyledTextButton)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  color: theme.palette.common.black,

  svg: {
    fontSize: '12px',
  },
}));
