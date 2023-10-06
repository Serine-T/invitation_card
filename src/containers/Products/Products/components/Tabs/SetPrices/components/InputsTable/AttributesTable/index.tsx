import { memo } from 'react';

import TableCell from '@mui/material/TableCell';
import StyledTable from '@containers/common/Table';
import { StyledTableRow } from '@containers/common/Table/styled';
import { StyledTableCell } from '@containers/common/StyledAddEditTables/styled';
import Stack from '@mui/material/Stack';
import { useFormContext } from 'react-hook-form';
import Typography from '@mui/material/Typography';

import { headCells } from './tableData';
import MiddleCell from './MiddleCell';

interface IAttributesTable {
  tableIdx: number;
}

const AttributesTable = ({ tableIdx }: IAttributesTable) => {
  const { watch } = useFormContext();
  const { quantityAttributes } = watch(`productsPrices[${tableIdx}]`);

  return (
    <Stack mb="16px">
      <StyledTable headCells={headCells}>
        {
          quantityAttributes.map(({ name }: any, rowIdx: number) => (
            // eslint-disable-next-line react/no-array-index-key
            <StyledTableRow key={rowIdx}>
              <StyledTableCell>
                <Typography variant="body3" mr="16px">{name}</Typography>
              </StyledTableCell>
              <TableCell>
                <MiddleCell tableIdx={tableIdx} rowIdx={rowIdx} />
              </TableCell>
            </StyledTableRow>
          ))
        }

      </StyledTable>
    </Stack>
  );
};

export default memo(AttributesTable);
