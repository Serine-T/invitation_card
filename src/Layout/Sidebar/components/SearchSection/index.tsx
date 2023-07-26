import { memo } from 'react';

import SearchField from '@containers/common/SearchField';

import { StyledSearchBox } from './styled';

const SearchSection = () => {
  return (
    <StyledSearchBox>
      <SearchField />
    </StyledSearchBox>
  );
};

export default memo(SearchSection);
