import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

export const StyledInput = styled('input')({
  border: '0',
  padding: '0',
  width: '200%',
  height: '200%',
  cursor: 'pointer',
  transform: 'translate(-25%, -25%)',
});

export const StyledInputBox = styled(Box)(() => ({
  width: '24px',
  height: '24px',
  overflow: 'hidden',
  zIndex: '9',
}));

export const StyledColorPickerContent = styled(Box)({
  display: 'grid',
  alignItems: 'center',
  gridTemplateColumns: '36px 1fr',
});
