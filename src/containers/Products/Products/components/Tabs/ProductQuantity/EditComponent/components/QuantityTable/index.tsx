import { memo } from 'react';

import { StyledTableRow } from '@containers/common/Table/styled';
import TableCell from '@mui/material/TableCell';
import { useFormContext } from 'react-hook-form';
import { StyledTableCell } from '@containers/common/StyledAddEditTables/styled';
import Input from '@containers/common/Input';
import StyledTable from '@containers/common/Table';
import StyledTypography from '@containers/common/StyledTypography';
import Typography from '@mui/material/Typography';

import { headCells } from './tableData';

interface IQuantityTable {
  idx: number;
}

const QuantityTable = ({ idx }: IQuantityTable) => {
  const { register, formState: { errors } } = useFormContext();

  console.log('idx', idx);

  return (
    <StyledTable headCells={headCells}>
      <StyledTableRow>
        <StyledTableCell>
          <Typography>
            200
          </Typography>
        </StyledTableCell>
        <TableCell>
          <Input
            placeholder="Quantity"
            {...register('quantity')}
            errorMessage={errors?.quantity?.message as any}
          />
        </TableCell>
        <TableCell>
          <StyledTypography
            color="blue"
            variant="body3"
            cursor="pointer"
            // onClick={handleDelete}
          >
            Delete
          </StyledTypography>
        </TableCell>
      </StyledTableRow>
    </StyledTable>
  );
};

export default memo(QuantityTable);
