// import InputsTable from '../components/InputsTable';

// const AddTemplate = () => {
//   return (
//     <InputsTable />
//   );
// };

// export default AddTemplate;
import { useAppDispatch, useAppSelector } from '@features/app/hooks';
import Loader from '@containers/common/Loader';
import EmptyState from '@containers/common/EmptyState';
import useMount from '@customHooks/useMount';
import { selectSubcategories } from '@features/subcategories/selectors';
import { getAllSubcategories } from '@features/subcategories/actions';

import InputsTable from '../components/InputsTable';

const AddTemplate = () => {
  const { isLoading, data: subCategories } = useAppSelector(selectSubcategories);
  const dispatch = useAppDispatch();

  useMount(() => {
    dispatch(getAllSubcategories());
  });

  if (!subCategories.length && isLoading) {
    return <Loader />;
  }

  return subCategories.length ? (
    <InputsTable />
  ) : (<EmptyState text="You don’t have any product categories, please add new to proceed" />);
};

export default AddTemplate;
