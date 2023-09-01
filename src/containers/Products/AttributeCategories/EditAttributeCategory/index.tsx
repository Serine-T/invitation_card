import { memo, useState } from 'react';

import { useAppDispatch, useAppSelector } from '@features/app/hooks';
import { useNavigate, useParams } from 'react-router-dom';
import useMount from '@customHooks/useMount';
import Loader from '@containers/common/Loader';
import PAGE_ROUTES from '@routes/routingEnum';
import { selectAttributeCategories } from '@features/attributeCategories/selectors';
import { IAttributeCategory } from '@features/attributeCategories/types';
import { getAttributeCategoryById } from '@features/attributeCategories/actions';

import InputsTable from '../components/InputsTable';

const EditAttributeCategory = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const [attributeCategoriesData, setAttributeCategoriesData] = useState<IAttributeCategory | null>(null);
  const { isLoading } = useAppSelector(selectAttributeCategories);

  useMount(() => {
    dispatch(getAttributeCategoryById(id as string)).unwrap().then((data) => {
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
