import { memo } from 'react';

import { StyledTableRow } from '@containers/common/Table/styled';
import TableCell from '@mui/material/TableCell';

import MiddleCell from '../MiddleCell';

interface IQuantityRow{
  quantityId: any;
  attributes: any; // TODO: change typing
}

const QuantityRow = ({ quantityId, attributes }: IQuantityRow) => {
  return (
    <StyledTableRow key={quantityId}>
      <TableCell>{quantityId}</TableCell>
      <TableCell sx={{ padding: '0 !important' }}>
        {attributes.map(({ inkId, turnArounds }: any, idx: number) => (
          <MiddleCell key={inkId} inkId={inkId} turnArounds={turnArounds} idx={idx} />
        ))}
      </TableCell>
      <TableCell>Delete</TableCell>
    </StyledTableRow>
  );
};

export default memo(QuantityRow);
