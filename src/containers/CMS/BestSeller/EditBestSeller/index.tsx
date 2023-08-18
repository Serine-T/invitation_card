import { memo } from 'react';

import InputsTable from '../components/InputsTable';

const EditBestSeller = () => {
  return (
    <InputsTable bestSellerData />
  );
};

export default memo(EditBestSeller);
