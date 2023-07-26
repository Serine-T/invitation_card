import { memo, useEffect, useMemo } from 'react';

import { useLocation } from 'react-router-dom';
import useResponsive from '@customHooks/useResponsive';
import Box from '@mui/material/Box';
import postcardsLogo from '@assets/images/postcards-logo.png';

import { StyledLogoBox, StyledBox, StyledDraw } from './styled';
import SidebarMenu from './components/SidebarMenu';
import LogOut from './components/LogOut';
import SearchSection from './components/SearchSection';

interface ISidebar {
  open: boolean;
  onCloseNav: () => void;
}

const Sidebar = ({ open, onCloseNav }: ISidebar) => {
  const { pathname } = useLocation();

  const isDesktop = useResponsive('up', 'lg');

  useEffect(() => {
    if (open) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = useMemo(() => (
    <>
      <Box>
        <StyledLogoBox>
          <img src={postcardsLogo} alt="postcards Logo" />
        </StyledLogoBox>
        <SearchSection />
        <SidebarMenu />
      </Box>
      <LogOut />
    </>
  ), []);

  return isDesktop ? (
    <StyledBox
      component="nav"
      flexShrink={{ lg: 0 }}
    >
      <StyledDraw open variant="permanent">
        {renderContent}
      </StyledDraw>
    </StyledBox>
  ) : (
    <StyledDraw
      open={open}
      onClose={onCloseNav}
    >
      {renderContent}
    </StyledDraw>
  );
};

export default memo(Sidebar);
