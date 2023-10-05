import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';

export const StyledAttributeStack = styled(Stack, {
  shouldForwardProp: (prop) => prop !== 'isSelected' && prop !== 'btn',
})<{isSelected: boolean; btn?: boolean}>(({ theme, isSelected, btn }) => ({
  border: `1px solid ${btn || !isSelected ? theme.palette.grey[500] : theme.palette.primary.dark}`,
  alignItems: 'center',
  padding: '9px 12px',
  borderRadius: '4px',
  cursor: 'pointer',
}));
