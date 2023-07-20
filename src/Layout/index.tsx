import { useState } from 'react';

import { Outlet } from 'react-router-dom';
import useResponsive from '@customHooks/useResponsive';

import Header from './Header';
import Nav from './Sidebar';
import { StyledMain, StyledRoot } from './styled';

const Layout = () => {
  const [open, setOpen] = useState(false);
  const isMobile = useResponsive('down', 'lg');

  return (
    <StyledRoot>
      {isMobile && <Header onOpenNav={() => setOpen(true)} />}
      <Nav openNav={open} onCloseNav={() => setOpen(false)} />
      <StyledMain>
        <Outlet />
      </StyledMain>
    </StyledRoot>
  );
};

export default Layout;
