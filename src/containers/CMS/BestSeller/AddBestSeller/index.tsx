import { memo } from 'react';

import { useAppDispatch, useAppSelector } from '@features/app/hooks';
import useMount from '@customHooks/useMount';
import { getAllSubcategories } from '@features/subcategories/actions';
import { selectSubcategories } from '@features/subcategories/selectors';
import Loader from '@containers/common/Loader';
import EmptyState from '@containers/common/EmptyState';

import InputsTable from '../components/InputsTable';

const AddBestSeller = () => {
  const { isLoading, data: subcategories } = useAppSelector(selectSubcategories);

  const dispatch = useAppDispatch();

  useMount(() => {
    dispatch(getAllSubcategories());
  });

  if (!subcategories.length && isLoading) {
    return <Loader />;
  }

  return subcategories.length ? (
    <InputsTable />
  ) : (<EmptyState text="You don’t have any subcategories, please add new to proceed" />);
};

export default memo(AddBestSeller);
