import { memo } from 'react';

import StyledTable from '@containers/common/Table';
import RowComponent from '@containers/common/Table/components/RowComponent';
import ReusableFields from '@containers/common/Table/components/ReusableFields';
import Box from '@mui/material/Box';

import { fields } from './helpers';

const ProductDescription = () => {
  return (
    <Box mt="24px">
      <StyledTable tableTitle="PRODUCT DESCRIPTIONS" colSpan={2}>
        {fields.map((item) => (
          <RowComponent key={item.label} {...item}>
            <ReusableFields {...item} />
          </RowComponent>
        ))}
      </StyledTable>
    </Box>
  );
};

export default memo(ProductDescription);
