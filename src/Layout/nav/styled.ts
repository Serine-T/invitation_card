import { styled } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';

export const StyledDraw = styled(Drawer)(() => ({
  '.MuiDrawer-paper': {
    width: 220,
    borderRadius: 0,
    padding: '20px 16px 32px',
  },
}));

export const StyledBox = styled(Box)(() => ({
  width: 220,
}));
