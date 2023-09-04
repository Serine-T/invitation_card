import { memo, useState } from 'react';

import { useAppDispatch, useAppSelector } from '@features/app/hooks';
import { useNavigate, useParams } from 'react-router-dom';
import useMount from '@customHooks/useMount';
import Loader from '@containers/common/Loader';
import PAGE_ROUTES from '@routes/routingEnum';
import { selectTemplateCategories } from '@features/templateCategories/selectors';
import { ITemplateCategory } from '@features/templateCategories/types';
import { getTemplateCategoryById } from '@features/templateCategories/actions';

import InputsTable from '../components/InputsTable';

const EditTemplateCategory = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const [templateCategoriesData, setTemplateCategoriesData] = useState<ITemplateCategory | null>(null);
  const { isLoading } = useAppSelector(selectTemplateCategories);

  useMount(() => {
    dispatch(getTemplateCategoryById(id as string)).unwrap().then((data) => {
      setTemplateCategoriesData(data);
    }).catch(() => navigate(PAGE_ROUTES.TEMPLATE_CATEGORIES));
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      {templateCategoriesData && <InputsTable templateCategoriesData={templateCategoriesData} />}
    </>
  );
};

export default memo(EditTemplateCategory);
