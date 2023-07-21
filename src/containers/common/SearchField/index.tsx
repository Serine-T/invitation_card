import { memo } from 'react';

import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import BaseInput, { IBaseInputProps } from '@containers/common/Input/index';
// import { useFormContext } from 'react-hook-form';

const SearchField = (props: IBaseInputProps) => {
  const { name = 'search' } = props;

  // TODO: ADD register
  // const { register } = useFormContext();

  return (
    <BaseInput
      {...props}
      type="text"
      autoComplete={name}
      placeholder="Search"
      // {...register(name)}
      endAdornment={(
        <InputAdornment position="start">
          <SearchIcon />
        </InputAdornment>
      )}
    />

  );
};

export default memo(SearchField);
