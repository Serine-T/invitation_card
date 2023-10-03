import { memo, useEffect, useState } from 'react';

import { getAllProductsQuantities } from '@features/products/productsQuantity/actions';
import { useAppDispatch, useAppSelector } from '@features/app/hooks';
import { selectProductsQuantities } from '@features/products/productsQuantity/selectors';
import { useParams } from 'react-router-dom';
import { getAttributeByCategoryName } from '@features/attributes/actions';

import AddComponent from './AddComponent';
import EditComponent from './EditComponent';

const InputsTable = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { data: productQuantities } = useAppSelector(selectProductsQuantities);
  const [isQuantityAdded, setIsQuantityAdded] = useState(false);

  useEffect(() => {
    dispatch(getAllProductsQuantities(id as string)).unwrap().then((data) => {
      if (data.length) {
        dispatch(getAttributeByCategoryName('Turn Around'));
        dispatch(getAttributeByCategoryName('Ink'));
      }
    }).catch(() => { });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isQuantityAdded]);

  return (
    <>
      <AddComponent setIsQuantityAdded={setIsQuantityAdded} />
      { !!productQuantities.length && <EditComponent />}
    </>
  );
};

export default memo(InputsTable);
