import { memo } from 'react';

import postcardsLogo from '@assets/images/postcards-logo.png';

import { StyledLogoBox } from './styled';
import navData from './helpers';
import SidebarAccardion from './SidebarAccardion';

const SidebarMenu = () => {
  return (
    <>
      <StyledLogoBox>
        <img src={postcardsLogo} alt="postcards Logo" />
      </StyledLogoBox>
      {
        navData.map((item) => (
          <SidebarAccardion key={item.path} {...item} />
        ))
}
    </>
  );
};

export default memo(SidebarMenu);
