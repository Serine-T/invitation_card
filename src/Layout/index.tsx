import { useState } from 'react';

import { Outlet } from 'react-router-dom';
import useResponsive from '@customHooks/useResponsive';

import Sidebar from './Sidebar';
import { StyledMain, StyledRoot } from './styled';
import HeaderSection from './Header';

const Layout = () => {
  const [open, setOpen] = useState(false);
  const isMobile = useResponsive('down', 'lg');

  return (
    <StyledRoot>
      {isMobile && <HeaderSection onOpenNav={() => setOpen(true)} />}
      <Sidebar open={!isMobile || open} onCloseNav={() => setOpen(false)} />
      <StyledMain>
        <Outlet />
      </StyledMain>
    </StyledRoot>
  );
};

export default Layout;
