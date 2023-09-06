import { useAppDispatch, useAppSelector } from '@features/app/hooks';
import Loader from '@containers/common/Loader';
import EmptyState from '@containers/common/EmptyState';
import useMount from '@customHooks/useMount';
import { selectAttributeCategories } from '@features/attributeCategories/selectors';
import { getAllAttributeCategories } from '@features/attributeCategories/actions';

import InputsTable from '../components/InputsTable';

const AddAttribute = () => {
  const { isLoading, data: attributeCategories } = useAppSelector(selectAttributeCategories);
  const dispatch = useAppDispatch();

  useMount(() => {
    dispatch(getAllAttributeCategories());
  });

  if (!attributeCategories.length && isLoading) {
    return <Loader />;
  }

  return attributeCategories.length ? (
    <InputsTable />
  ) : (<EmptyState text="You don’t have any attribute categories, please add new to proceed" />);
};

export default AddAttribute;
