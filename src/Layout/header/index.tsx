import { styled } from '@mui/material/styles';
import { AppBar, Toolbar, IconButton } from '@mui/material';

const StyledRoot = styled(AppBar)(() => ({
  boxShadow: 'none',
}));

const StyledToolbar = styled(Toolbar)(() => ({
  minHeight: 64,
}));

export default function Header({ onOpenNav }:any) {
  return (
    <StyledRoot>
      <StyledToolbar>
        <IconButton
          onClick={onOpenNav}
        >
          fgfgg
        </IconButton>
      </StyledToolbar>
    </StyledRoot>
  );
}
