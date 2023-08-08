import { memo } from 'react';

import TitlesWithBackButton from '@containers/common/TitlesWithBackButton';
import PAGE_ROUTES from '@routes/routingEnum';
import { useAppSelector } from '@features/app/hooks';
import { selectUsers } from '@features/users/selectors';
import Loader from '@containers/common/Loader';

import InputsTable from '../components/InputsTable';

const AddUser = () => {
  const { isLoading } = useAppSelector(selectUsers);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <TitlesWithBackButton title="Add New User" path={PAGE_ROUTES.USERS}>
      <InputsTable />
    </TitlesWithBackButton>
  );
};

export default memo(AddUser);
