import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import CloseIcon from '@mui/icons-material/Close';

export const StyledCloseIcon = styled(CloseIcon)(() => ({
  fontSize: '16px',
  cursor: 'pointer',
}));

export const StyledMiddleCell = styled(Stack)(({ theme }) => ({
  padding: '16px',
  borderBottom: `1px solid ${theme.palette.grey[500]} `,

  '&:last-child': {
    borderBottom: 0,
  },
}));
