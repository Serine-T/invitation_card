import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';

export const StyledIconButton = styled(IconButton)(({ theme }) => ({
  svg: {
    color: theme.palette.grey[300],
  },
}));
