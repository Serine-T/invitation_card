import { memo, useEffect, useState } from 'react';

import { getAllProductsQuantities } from '@features/products/productsQuantity/actions';
import { useAppDispatch, useAppSelector } from '@features/app/hooks';
import { selectProductsQuantities } from '@features/products/productsQuantity/selectors';
import { useParams } from 'react-router-dom';
import Loader from '@containers/common/Loader';

import AddComponent from './AddComponent';
import EditComponent from './EditComponent';

const InputsTable = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { data: productQuantities, isLoading } = useAppSelector(selectProductsQuantities);
  const [isQuantityAdded, setIsQuantityAdded] = useState(false);

  useEffect(() => {
    dispatch(getAllProductsQuantities(id as string)).unwrap().then(() => {}).catch(() => { });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isQuantityAdded]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <AddComponent setIsQuantityAdded={setIsQuantityAdded} isQuantityAdded={isQuantityAdded} />
      { !!productQuantities.length && <EditComponent />}
    </>
  );
};

export default memo(InputsTable);
