import { memo } from 'react';

import InputsTable from '../components/InputsTable';

const EditProductCategory = () => {
  return (
    <InputsTable productCategoriesData />
  );
};

export default memo(EditProductCategory);
