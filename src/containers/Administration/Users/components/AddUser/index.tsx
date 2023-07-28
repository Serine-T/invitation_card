import { memo } from 'react';

import InputsTable from '../components/InputsTable';

const AddUser = () => {
  return (
    <>
      <InputsTable title="Add New User" />
    </>
  );
};

export default memo(AddUser);
