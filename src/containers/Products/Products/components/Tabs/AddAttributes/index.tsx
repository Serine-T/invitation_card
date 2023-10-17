import { memo } from 'react';

import useMount from '@customHooks/useMount';
import { getAllAttributeCategoriesProducts } from '@features/attributeCategories/actions';
import { useAppDispatch, useAppSelector } from '@features/app/hooks';
import { selectAttributeCategories } from '@features/attributeCategories/selectors';
import EmptyState from '@containers/common/EmptyState';
import Loader from '@containers/common/Loader';
import { getAllAttributesByProductId } from '@features/products/productsAttributes/actions';
import { useParams } from 'react-router-dom';
import { selectProductsAttributes } from '@features/products/productsAttributes/selectors';

import InputsTable from './components/InputsTable';

const AddAttributes = () => {
  const dispatch = useAppDispatch();
  const { isLoading: productAttributesLoading } = useAppSelector(selectProductsAttributes);
  const { productAttributeCategories, isLoading } = useAppSelector(selectAttributeCategories);
  const { id } = useParams();

  useMount(() => {
    dispatch(getAllAttributeCategoriesProducts()).unwrap().then((data) => {
      if (data.length) {
        dispatch(getAllAttributesByProductId(id as string));
      }
    });
  });

  if ((isLoading && !productAttributeCategories.length) || productAttributesLoading) {
    return <Loader />;
  }

  return (
    <>
      {productAttributeCategories.length ? <InputsTable /> : (
        <EmptyState text="You don’t have any attribute categories, please add new to proceed" />
      )}
    </>
  );
};

export default memo(AddAttributes);
