import { memo, useState } from 'react';

import useMount from '@customHooks/useMount';
import Loader from '@containers/common/Loader';
import { useAppDispatch, useAppSelector } from '@features/app/hooks';
import { getSubcategoryById } from '@features/subcategories/actions';
import { useNavigate, useParams } from 'react-router-dom';
import PAGE_ROUTES from '@routes/routingEnum';
import { selectSubcategories } from '@features/subcategories/selectors';
import { ISubcategoriesInfo } from '@features/subcategories/types';
import { getAllCategories } from '@features/categories/actions';
import { selectCategories } from '@features/categories/selectors';
import EmptyState from '@containers/common/EmptyState';

import InputsTable from '../components/InputsTable';

const EditProductCategory = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading: categoriesLoading, data: categories } = useAppSelector(selectCategories);

  const { id } = useParams();
  const [subcategoriesData, setSubcategoriesData] = useState<ISubcategoriesInfo | null>(null);
  const { isLoading } = useAppSelector(selectSubcategories);

  useMount(() => {
    dispatch(getSubcategoryById(id as string)).unwrap().then((data) => {
      setSubcategoriesData(data);
    }).catch(() => navigate(PAGE_ROUTES.PRODUCT_CATEGORIES));

    dispatch(getAllCategories());
  });

  if (isLoading || categoriesLoading) {
    return <Loader />;
  }

  return (
    <>
      {(categories.length && subcategoriesData)
        ? <InputsTable subcategoriesData={subcategoriesData} /> : (
          <EmptyState text="You don’t have any categories, please add new to proceed" />
        )}
    </>
  );
};

export default memo(EditProductCategory);
