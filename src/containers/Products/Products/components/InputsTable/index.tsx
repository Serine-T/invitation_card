import { memo, useState } from 'react';

import { IProductsPayload } from '@features/products/types';
import TitlesWithBackButton from '@containers/common/TitlesWithBackButton';

import { StyledDivider, StyledTab, StyledTabs } from './styles';
import { tabsOptions } from './helpers';

interface IInputsTable{
  editData?: IProductsPayload;
}

const InputsTable = ({ editData }: IInputsTable) => {
  const [value, setValue] = useState(0);

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };

  return (
    <>
      <TitlesWithBackButton
        title={editData ? 'Edit Product' : 'Add Product'}
        path="PRODUCTS"
      >
        <StyledDivider>
          <StyledTabs value={value} onChange={handleChange}>
            {
                tabsOptions.map(({ label, option }) => (
                  <StyledTab key={option} label={label} disableRipple />
                ))
            }
          </StyledTabs>
        </StyledDivider>
      </TitlesWithBackButton>
    </>
  );
};

export default memo(InputsTable);
