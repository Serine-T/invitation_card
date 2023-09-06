import { memo, useState } from 'react';

import { useAppDispatch, useAppSelector } from '@features/app/hooks';
import { useNavigate, useParams } from 'react-router-dom';
import useMount from '@customHooks/useMount';
import Loader from '@containers/common/Loader';
import PAGE_ROUTES from '@routes/routingEnum';
import { selectTemplates } from '@features/templates/selectors';
import { ITemplate } from '@features/templates/types';
import { getTemplateById } from '@features/templates/actions';
import { getAllSubcategories } from '@features/subcategories/actions';
import { selectSubcategories } from '@features/subcategories/selectors';
import EmptyState from '@containers/common/EmptyState';
import { getAllTemplateCategories } from '@features/templateCategories/actions';
import { selectTemplateCategories } from '@features/templateCategories/selectors';

import InputsTable from '../components/InputsTable';

const EditTemplate = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const [templatesData, setTemplatesData] = useState<ITemplate | null>(null);
  const { isLoading } = useAppSelector(selectTemplates);
  const { isLoading: subcategoriesLoading, data: subcategories } = useAppSelector(selectSubcategories);
  const { isLoading: templateCategoriesLoading } = useAppSelector(selectTemplateCategories);

  useMount(() => {
    dispatch(getAllSubcategories());
    dispatch(getAllTemplateCategories());
    dispatch(getTemplateById(id as string)).unwrap().then((data) => {
      setTemplatesData(data);
    }).catch(() => navigate(PAGE_ROUTES.TEMPLATES));
  });

  if (isLoading || subcategoriesLoading || templateCategoriesLoading) {
    return <Loader />;
  }

  return (

    <>
      {(subcategories.length && templatesData)
        ? <InputsTable templatesData={templatesData} /> : (
          <EmptyState text="You don’t have any subcategories, please add new to proceed" />
        )}
    </>
  );
};

export default memo(EditTemplate);
