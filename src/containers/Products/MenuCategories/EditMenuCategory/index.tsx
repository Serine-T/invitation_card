import { memo, useState } from 'react';

import { useAppDispatch, useAppSelector } from '@features/app/hooks';
import { useNavigate, useParams } from 'react-router-dom';
import useMount from '@customHooks/useMount';
import { getCategoryById } from '@features/categories/actions';
import { selectCategories } from '@features/categories/selectors';
import Loader from '@containers/common/Loader';
import PAGE_ROUTES from '@routes/routingEnum';
import { ICategories } from '@features/categories/types';

import InputsTable from '../components/InputsTable';

const EditMenuCategory = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const [categoriesData, setCategoriesData] = useState<ICategories | null>(null);
  const { isLoading } = useAppSelector(selectCategories);

  useMount(() => {
    dispatch(getCategoryById(id as string)).unwrap().then((data) => {
      setCategoriesData(data);
    }).catch(() => navigate(PAGE_ROUTES.MENU_CATEGORIES));
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      {categoriesData && <InputsTable categoriesData={categoriesData} />}
    </>
  );
};

export default memo(EditMenuCategory);
