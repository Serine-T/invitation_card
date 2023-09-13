import { useAppDispatch, useAppSelector } from '@features/app/hooks';
import Loader from '@containers/common/Loader';
import { selectCategories } from '@features/categories/selectors';
import EmptyState from '@containers/common/EmptyState';
import useMount from '@customHooks/useMount';
import { getAllCategories } from '@features/categories/actions';

import InputsTable from '../components/InputsTable';

const AddProduct = () => {
  const { isLoading, data: categories } = useAppSelector(selectCategories);
  const dispatch = useAppDispatch();

  useMount(() => {
    dispatch(getAllCategories()).unwrap().then((data) => {
      console.log('daaataa', data);
    }).catch((e) => {
      console.log('e****', e);
    });
  });
  if ((!categories.length && isLoading)) {
    return <Loader />;
  }

  return (categories.length) ? (
    <InputsTable />
  ) : (<EmptyState text="You don’t have any categories, please add new to proceed" />);
};

export default AddProduct;
