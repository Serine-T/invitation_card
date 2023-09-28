import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Input from '@containers/common/Input';

export const StyledTextStack = styled(Stack)(() => ({
  flexDirection: 'row',
  alignItems: 'center',
  height: '36px',
  gap: '8px',
}));

export const StyledInput = styled(Input)(() => ({
  width: '95px',
}));
