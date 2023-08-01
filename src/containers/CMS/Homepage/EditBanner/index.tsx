import { memo } from 'react';

import TitlesWithBackButton from '@containers/common/TitlesWithBackButton';
import PAGE_ROUTES from '@routes/routingEnum';

import InputsTable from '../components/InputsTable';

const EditBanner = () => {
  return (
    <TitlesWithBackButton title="Edit Banner" path={PAGE_ROUTES.HOMEPAGE}>
      <InputsTable />
    </TitlesWithBackButton>
  );
};

export default memo(EditBanner);
