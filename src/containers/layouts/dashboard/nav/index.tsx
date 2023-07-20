import { memo, useEffect } from 'react';

import { useLocation } from 'react-router-dom';
import useResponsive from '@customHooks/useResponsive';

import { StyledBox, StyledDraw } from './styled';
import NavbarItems from './components/NavbarItems';
import LogOut from './components/LogOut';

interface INav {
  openNav: boolean;
  onCloseNav: () => void;
}

const Nav = ({ openNav, onCloseNav }: INav) => {
  const { pathname } = useLocation();

  const isDesktop = useResponsive('up', 'lg');

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <StyledBox
      component="nav"
      flexShrink={{ lg: 0 }}
    >
      <StyledDraw
        open={isDesktop ? true : openNav}
        variant={isDesktop ? 'permanent' : 'temporary'}
        onClose={onCloseNav}
      >
        <NavbarItems />
        <LogOut />
      </StyledDraw>

    </StyledBox>
  );
};

export default memo(Nav);
