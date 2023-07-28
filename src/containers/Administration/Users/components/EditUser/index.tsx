import { memo } from 'react';

import BackButton from '@containers/common/BackButton';
import PAGE_ROUTES from '@routes/routingEnum';

const EditUser = () => {
  return (
    <>
      <BackButton path={PAGE_ROUTES.USERS} />

    </>
  );
};

export default memo(EditUser);
