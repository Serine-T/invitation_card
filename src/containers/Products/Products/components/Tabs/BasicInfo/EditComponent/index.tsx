import { memo, useState } from 'react';

import useMount from '@customHooks/useMount';
import Loader from '@containers/common/Loader';
import { useAppDispatch, useAppSelector } from '@features/app/hooks';
import { useNavigate, useParams } from 'react-router-dom';
import PAGE_ROUTES from '@routes/routingEnum';
import { getAllCategories } from '@features/categories/actions';
import { selectCategories } from '@features/categories/selectors';
import EmptyState from '@containers/common/EmptyState';
import { IProductsPayload } from '@features/products/basicInfo/types';
import { getProductById } from '@features/products/basicInfo/actions';
import { selectProducts } from '@features/products/basicInfo/selectors';

import InputsTable from '../..';

const EditProduct = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading: categoriesLoading, data: categories } = useAppSelector(selectCategories);

  const { id } = useParams();
  const [productsData, setProductsData] = useState<IProductsPayload | null>(null);
  const { isLoading } = useAppSelector(selectProducts);

  useMount(() => {
    dispatch(getProductById(id as string)).unwrap().then((data) => {
      setProductsData(data);
      dispatch(getAllCategories());
    }).catch(() => navigate(PAGE_ROUTES.PRODUCTS));
  });

  if (isLoading || categoriesLoading) {
    return <Loader />;
  }

  return (
    <>
      {(categories.length && productsData)
        ? <InputsTable editData={productsData} /> : (
          <EmptyState text="You don’t have any categories, please add new to proceed" />
        )}
    </>
  );
};

export default memo(EditProduct);
