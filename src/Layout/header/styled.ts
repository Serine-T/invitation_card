import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

export const StyledHeader = styled(AppBar)(({ theme }) => ({
  width: '100%',
  boxShadow: 'none',
  background: theme.palette.common.white,

}));

export const StyledToolbar = styled(Toolbar)(() => ({
  justifyContent: 'flex-end',
}));
