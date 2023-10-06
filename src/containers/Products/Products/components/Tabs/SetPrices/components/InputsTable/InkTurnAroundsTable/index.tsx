import { memo } from 'react';

import TableCell from '@mui/material/TableCell';
import StyledTable from '@containers/common/Table';
import { StyledTableRow } from '@containers/common/Table/styled';
import { StyledTableCell } from '@containers/common/StyledAddEditTables/styled';
import Input from '@containers/common/Input';
import Stack from '@mui/material/Stack';
import { useFormContext } from 'react-hook-form';
import Checkbox from '@containers/common/Checkbox';
import Typography from '@mui/material/Typography';

import { headCells } from './tableData';
import MiddleCell from './components/MiddleCell';

interface IInkTurnAroundsTable {
  tableIdx: number;
}

const InkTurnAroundsTable = ({ tableIdx }: IInkTurnAroundsTable) => {
  const { register, formState: { errors }, watch } = useFormContext();
  const { quantity, quantityInk } = watch(`productsPrices[${tableIdx}]`);

  return (
    <Stack mb="16px">
      <StyledTable headCells={headCells}>
        <StyledTableRow>
          <StyledTableCell>
            <Stack direction="row" alignItems="center">
              <Checkbox name={`productsPrices[${tableIdx}].isVisible`} />
              <Typography variant="body3" mr="16px">{quantity}</Typography>
              <Input
                width="80px"
                placeholder="00.00"
                {...register(`productsPrices[${tableIdx}].basePrice`)}
                errorMessage={(errors as any)?.productsPrices?.[tableIdx]?.basePrice?.message as string}
              />
            </Stack>

          </StyledTableCell>
          <TableCell sx={{ padding: '0 !important' }}>
            {quantityInk.map((_: any, rowIdx: number) => (
              // eslint-disable-next-line react/no-array-index-key
              <MiddleCell key={rowIdx} tableIdx={tableIdx} rowIdx={rowIdx} />
            ))}

          </TableCell>
        </StyledTableRow>
      </StyledTable>
    </Stack>
  );
};

export default memo(InkTurnAroundsTable);
