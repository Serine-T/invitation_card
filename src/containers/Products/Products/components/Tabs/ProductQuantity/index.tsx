import { memo } from 'react';

import AddComponent from './AddComponent';
import EditComponent from './EditComponent';

const InputsTable = () => {
  return (
    <>
      <AddComponent />
      <EditComponent />
    </>
  );
};

export default memo(InputsTable);
