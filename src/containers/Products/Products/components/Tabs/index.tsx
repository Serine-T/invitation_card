import { SyntheticEvent, createElement, memo, useState } from 'react';

import { IProductsPayload } from '@features/products/basicInfo/types';
import TitlesWithBackButton from '@containers/common/TitlesWithBackButton';
import { StyledStack } from '@containers/common/StyledAddEditTables/styled';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';

import { StyledDivider, StyledTab, StyledTabs } from './styles';
import { tabsOptions } from './helpers';

interface IInputsTable{
  editData?: IProductsPayload;
}

const InputsTable = ({ editData }: IInputsTable) => {
  const navigate = useNavigate();
  const { pathname, search } = useLocation();
  const { tab } = queryString.parse(search);

  const [value, setValue] = useState((tab && +tab) ? +tab : 0);

  const handleChange = (event: SyntheticEvent<Element, Event>, newValue: number) => {
    setValue(newValue);
    navigate(`${pathname}?tab=${newValue}`);
  };

  return (
    <TitlesWithBackButton
      title={editData ? 'Edit Product' : 'Add Product'}
      path="PRODUCTS_PRODUCTS"
    >
      { !!editData && (
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
      )}
      {createElement(tabsOptions[value].component, { editData })}
    </TitlesWithBackButton>
  );
};

export default memo(InputsTable);
