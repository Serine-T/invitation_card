import { memo, useState } from 'react';

import { useAppDispatch, useAppSelector } from '@features/app/hooks';
import { useNavigate, useParams } from 'react-router-dom';
import useMount from '@customHooks/useMount';
import { getCategoryById } from '@features/categories/actions';
import Loader from '@containers/common/Loader';
import PAGE_ROUTES from '@routes/routingEnum';
import { selectAttributeCategories } from '@features/attributeCategories/selectors';
import { IAttributeCategories } from '@features/attributeCategories/types';

import InputsTable from '../components/InputsTable';

const EditAttributeCategory = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const [attributeCategoriesData, setAttributeCategoriesData] = useState<IAttributeCategories | null>(null);
  const { isLoading } = useAppSelector(selectAttributeCategories);

  useMount(() => {
    dispatch(getCategoryById(id as string)).unwrap().then((data) => {
      setAttributeCategoriesData(data);
    }).catch(() => navigate(PAGE_ROUTES.ATTRIBUTE_CATEGORIES));
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      {attributeCategoriesData && <InputsTable attributeCategoriesData={attributeCategoriesData} />}
    </>
  );
};

export default memo(EditAttributeCategory);
