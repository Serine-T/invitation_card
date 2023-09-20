import { createElement, memo, useState } from 'react';

import { IProductsPayload } from '@features/products/types';
import TitlesWithBackButton from '@containers/common/TitlesWithBackButton';
import { StyledStack } from '@containers/common/StyledAddEditTables/styled';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';

import { StyledDivider, StyledTab, StyledTabs } from './styles';
import { tabsOptions } from './helpers';

interface IInputsTable{
  editData?: IProductsPayload;
}

const InputsTable = ({ editData }: IInputsTable) => {
  const [value, setValue] = useState(0);
  const location = useLocation();
  const params = queryString.parse(location.search);

  console.log('paraams', params);

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };

  return (
    <TitlesWithBackButton
      title={editData ? 'Edit Product' : 'Add Product'}
      path="PRODUCTS"
    >
      <StyledStack>
        <StyledDivider>
          <StyledTabs value={value} onChange={handleChange}>
            {
                tabsOptions.map(({ label }) => (
                  <StyledTab key={label} label={label} disableRipple />
                ))
            }
          </StyledTabs>
        </StyledDivider>
      </StyledStack>
      {createElement(tabsOptions[value].component, { editData })}
    </TitlesWithBackButton>
  );
};

export default memo(InputsTable);
