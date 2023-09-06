import { memo, useState } from 'react';

import { useAppDispatch, useAppSelector } from '@features/app/hooks';
import { useNavigate, useParams } from 'react-router-dom';
import useMount from '@customHooks/useMount';
import Loader from '@containers/common/Loader';
import PAGE_ROUTES from '@routes/routingEnum';
import { selectTemplates } from '@features/templates/selectors';
import { ITemplate } from '@features/templates/types';
import { getTemplateById } from '@features/templates/actions';

import InputsTable from '../components/InputsTable';

const EditTemplate = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const [templatesData, setTemplatesData] = useState<ITemplate | null>(null);
  const { isLoading } = useAppSelector(selectTemplates);

  useMount(() => {
    dispatch(getTemplateById(id as string)).unwrap().then((data) => {
      setTemplatesData(data);
    }).catch(() => navigate(PAGE_ROUTES.TEMPLATES));
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      {templatesData && <InputsTable templatesData={templatesData} />}
    </>
  );
};

export default memo(EditTemplate);
