import { memo } from 'react';

import TitlesWithBackButton from '@containers/common/TitlesWithBackButton';
import PAGE_ROUTES from '@routes/routingEnum';

import InputsTable from '../components/InputsTable';

const AddUser = () => {
  return (
    <TitlesWithBackButton title="Add New User" path={PAGE_ROUTES.USERS}>
      <InputsTable />
    </TitlesWithBackButton>
  );
};

export default memo(AddUser);
