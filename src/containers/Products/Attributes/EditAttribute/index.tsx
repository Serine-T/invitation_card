import { memo, useState } from 'react';

import { useAppDispatch, useAppSelector } from '@features/app/hooks';
import { useNavigate, useParams } from 'react-router-dom';
import useMount from '@customHooks/useMount';
import Loader from '@containers/common/Loader';
import PAGE_ROUTES from '@routes/routingEnum';
import { selectAttributeCategories } from '@features/attributeCategories/selectors';
import { IAttributeCategory } from '@features/attributeCategories/types';
import { getAttributeById } from '@features/attributes/actions';

import InputsTable from '../components/InputsTable';

const EditAttribute = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const [attributesData, setAttributesData] = useState<IAttributeCategory | null>(null);
  const { isLoading } = useAppSelector(selectAttributeCategories);

  useMount(() => {
    dispatch(getAttributeById(id as string)).unwrap().then((data) => {
      setAttributesData(data);
    }).catch(() => navigate(PAGE_ROUTES.ATTRIBUTES));
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      {attributesData && <InputsTable attributesData={attributesData} />}
    </>
  );
};

export default memo(EditAttribute);
