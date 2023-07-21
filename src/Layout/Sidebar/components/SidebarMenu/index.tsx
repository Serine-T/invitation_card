import { memo } from 'react';

import navData from './helpers';
import SidebarAccardion from './SidebarAccardion';

const SidebarMenu = () => {
  return (
    <>
      {
        navData.map((item) => (
          <SidebarAccardion key={item.path} {...item} />
        ))
      }
    </>
  );
};

export default memo(SidebarMenu);
