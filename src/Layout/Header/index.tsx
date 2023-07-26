import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import { StyledHeader, StyledToolbar } from './styled';

interface IHeader {
  onOpenNav: () => void;
}

const HeaderSection = ({ onOpenNav }: IHeader) => {
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

export default HeaderSection;
