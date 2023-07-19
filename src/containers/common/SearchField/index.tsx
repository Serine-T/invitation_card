import { memo } from 'react';

import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import { OutlinedTextFieldProps } from '@mui/material/TextField';

import { StyledSearchField } from './styled';

interface ISearchFieldProps extends OutlinedTextFieldProps {}

const SearchField = ({ InputProps, ...restProps }: ISearchFieldProps) => (
  <StyledSearchField
    label="Search"
    id="outlined-search"
    placeholder="Search"
    InputProps={{
      ...InputProps,
      endAdornment: (
        <InputAdornment position="end">
          <SearchIcon />
        </InputAdornment>
      ),
    }}
    {...restProps}
  />
);

export default memo(SearchField);
