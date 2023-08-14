import { memo } from 'react';

import TitlesWithBackButton from '@containers/common/TitlesWithBackButton';
import PAGE_ROUTES from '@routes/routingEnum';

import InputsTable from '../components/InputsTable';

const AddBanner = () => {
  return (
    <TitlesWithBackButton title="Add New Banner" path={PAGE_ROUTES.HOMEPAGE}>
      <InputsTable />
    </TitlesWithBackButton>
  );
};

export default memo(AddBanner);
