import { memo } from 'react';

import TitlesWithBackButton from '@containers/common/TitlesWithBackButton';

import InputsTable from '../components/InputsTable';

const AddUser = () => {
  return (
    <>
      <TitlesWithBackButton title="Add New User">
        <InputsTable />
      </TitlesWithBackButton>
    </>
  );
};

export default memo(AddUser);
