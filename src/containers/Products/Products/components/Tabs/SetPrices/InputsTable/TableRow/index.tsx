import { memo } from 'react';

import { StyledTableCell } from '@containers/common/StyledAddEditTables/styled';
import { StyledTableRow } from '@containers/common/Table/styled';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { useFormContext } from 'react-hook-form';
import { IProductsSetPrice } from '@features/products/setPrice/types';

import AttributeCell from '../AttributeCell';

interface ITableRow {
  rowIdx: number;
}

const TableRow = ({ rowIdx }: ITableRow) => {
  const { watch } = useFormContext();
  const { quantity, basePrice, attributeCategories } = watch(`quantities[${rowIdx}]`);

  return (
    <StyledTableRow>
      <StyledTableCell>
        <Stack direction="row" gap="8px">
          <Typography variant="body3">
            {quantity}
          </Typography>

          <Typography variant="body3">
            $
            {basePrice}
          </Typography>
        </Stack>

      </StyledTableCell>
      {attributeCategories.map((_:IProductsSetPrice, attrIdx: number) => (
        // eslint-disable-next-line react/no-array-index-key
        <AttributeCell key={attrIdx} rowIdx={rowIdx} attrIdx={attrIdx} />
      ))}
    </StyledTableRow>
  );
};

export default memo(TableRow);
