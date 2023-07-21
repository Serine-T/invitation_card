import { ChangeEventHandler, memo } from 'react';

import debounce from 'lodash/debounce';
import SearchField from '@containers/common/SearchField';

// import DashboardLayout from '@containers/layouts/dashboard/DashboardLayout';

const Home = () => {
  const handleSearchChange: ChangeEventHandler<HTMLInputElement> = debounce(
    (event) => {
      console.log(event.target.value);
    },
    1000,
  );

  return (
    <>
      Home
      <SearchField
        onChange={handleSearchChange}
        label="Search"
      />
    </>
  );
};

export default memo(Home);
