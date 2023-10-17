import { memo } from 'react';

import TableCell from '@mui/material/TableCell';
import { useFormContext } from 'react-hook-form';
import { Attribute } from '@features/attributes/types';
import Stack from '@mui/material/Stack';

import StyledStack from '../StyledStack';

interface IAttributeCell {
  rowIdx: number;
  attrIdx: number;
}

const AttributeCell = ({ rowIdx, attrIdx }: IAttributeCell) => {
  const { watch } = useFormContext();

  const { attributes } = watch(`quantities[${rowIdx}].attributeCategories[${attrIdx}]`);

  return (
    <TableCell>
      <Stack gap="16px">
        {attributes.map((_: Attribute, attrRowIdx: number) => (
          <StyledStack
            // eslint-disable-next-line react/no-array-index-key
            key={attrRowIdx}
            rowIdx={rowIdx}
            attrIdx={attrIdx}
            attrRowIdx={attrRowIdx}
          />
        ))}
      </Stack>
    </TableCell>
  );
};

export default memo(AttributeCell);
