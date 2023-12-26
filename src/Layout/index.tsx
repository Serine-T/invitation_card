import { Outlet } from 'react-router-dom';

import { StyledMain, StyledRoot } from './styled';

const Layout = () => {
  return (
    <StyledRoot>
      <StyledMain>
        <Outlet />
      </StyledMain>
    </StyledRoot>
  );
};

export default Layout;
