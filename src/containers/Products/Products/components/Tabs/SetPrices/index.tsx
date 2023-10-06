import { memo } from 'react';

import { useAppDispatch, useAppSelector } from '@features/app/hooks';
import { selectProductsSetPrice } from '@features/products/setPrice/selectors';
import useMount from '@customHooks/useMount';
import { getAllPricesByProductId } from '@features/products/setPrice/actions';
import { useParams } from 'react-router-dom';
import Loader from '@containers/common/Loader';
import EmptyState from '@containers/common/EmptyState';

import InputsTable from './InputsTable';

const SetPrices = () => {
  const dispatch = useAppDispatch();
  const { isLoading, data: productsPrices } = useAppSelector(selectProductsSetPrice);
  const { id } = useParams();

  useMount(() => {
    dispatch(getAllPricesByProductId(id as string));
  });

  if (isLoading && !productsPrices.length) {
    return <Loader />;
  }

  return (
    productsPrices.length ? (
      <>
        <InputsTable />
      </>
    ) : (
      <EmptyState text="You don’t have any prices, please add new to proceed" />
    )
  );
};

export default memo(SetPrices);
