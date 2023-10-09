import { memo, useState } from 'react';

import { useAppDispatch, useAppSelector } from '@features/app/hooks';
import { useNavigate, useParams } from 'react-router-dom';
import useMount from '@customHooks/useMount';
import Loader from '@containers/common/Loader';
import PAGE_ROUTES from '@routes/routingEnum';
import { getAttributeById } from '@features/attributes/actions';
import { IAddAttributePayload } from '@features/attributes/types';
import { selectAttributes } from '@features/attributes/selectors';
import { getAllAttributeCategories } from '@features/attributeCategories/actions';
import { selectAttributeCategories } from '@features/attributeCategories/selectors';
import EmptyState from '@containers/common/EmptyState';

import InputsTable from '../components/InputsTable';

const EditAttribute = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const [attributesData, setAttributesData] = useState<IAddAttributePayload | null>(null);
  const { isLoading } = useAppSelector(selectAttributes);
  const { isLoading: attrCategoriesLoading, data: attrCategories } = useAppSelector(selectAttributeCategories);

  useMount(() => {
    dispatch(getAllAttributeCategories());
    dispatch(getAttributeById(id as string)).unwrap().then((data) => {
      setAttributesData(data);
    }).catch(() => navigate(PAGE_ROUTES.ATTRIBUTES));
  });

  if (isLoading || attrCategoriesLoading) {
    return <Loader />;
  }

  return (attrCategories.length && attributesData)
    ? <InputsTable attributesData={attributesData} />
    : <EmptyState text="You don’t have any attribute categories, please add new to proceed" />;
};

export default memo(EditAttribute);
