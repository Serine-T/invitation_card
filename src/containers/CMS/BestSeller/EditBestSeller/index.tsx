import { memo } from 'react';

import TitlesWithBackButton from '@containers/common/TitlesWithBackButton';
import PAGE_ROUTES from '@routes/routingEnum';

import InputsTable from '../components/InputsTable';

const EditBestSeller = () => {
  return (
    <TitlesWithBackButton title="Edit Banner" path={PAGE_ROUTES.BEST_SELLER}>
      <InputsTable />
    </TitlesWithBackButton>
  );
};

export default memo(EditBestSeller);
