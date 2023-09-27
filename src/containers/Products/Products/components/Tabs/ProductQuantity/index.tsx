import { memo } from 'react';

import AddComponent from './components/AddComponent';
import EditComponent from './components/EditComponent';

const InputsTable = () => {
  return (
    <>
      <AddComponent />
      <EditComponent />
    </>
  );
};

export default memo(InputsTable);
