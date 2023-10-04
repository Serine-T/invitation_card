import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';

export const StyledAttributeStack = styled(Stack, {
  shouldForwardProp: (prop) => prop !== 'isSelected',
})<{isSelected: boolean}>(({ theme, isSelected }) => ({
  border: `1px solid ${isSelected ? theme.palette.primary : theme.palette.grey[500]}`,
  alignItems: 'center',
  padding: '9px 12px',
  borderRadius: '4px',
}));
