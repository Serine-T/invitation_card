import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import { StyledHeader, StyledToolbar } from './styled';

interface IHeader {
  onOpenNav: ()=> void;
}

const Header = ({ onOpenNav }:IHeader) => {
  return (
    <StyledHeader>
      <StyledToolbar>
        <IconButton
          onClick={onOpenNav}
        >
          <MenuIcon />
        </IconButton>
      </StyledToolbar>
    </StyledHeader>
  );
};

export default Header;
