import { useAppDispatch, useAppSelector } from '@features/app/hooks';
import Loader from '@containers/common/Loader';
import { selectCategories } from '@features/categories/selectors';
import EmptyState from '@containers/common/EmptyState';
import useMount from '@customHooks/useMount';
import { getAllCategories } from '@features/categories/actions';
import { useForm } from 'react-hook-form';

import InputsTable from '../components/InputsTable';

const AddProductCategory = () => {
  const { isLoading, data: categories } = useAppSelector(selectCategories);
  const dispatch = useAppDispatch();

  const { setValue } = useForm();

  console.log('isLoading****', isLoading);

  useMount(() => {
    dispatch(getAllCategories()).unwrap().then(() => {
      setValue('categoryId', categories[0]?.id);
    });
  });
  if (!categories.length && isLoading) {
    return <Loader />;
  }

  return categories.length ? (
    <InputsTable />
  ) : (<EmptyState text="You don’t have any categories, please add new to proceed" />);
};

export default AddProductCategory;
