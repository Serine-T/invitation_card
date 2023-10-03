import { memo } from 'react';

import { StyledMuiTable, StyledTableContainer, StyledTableRow } from '@containers/common/Table/styled';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import AddTextBtn from '@containers/common/Table/components/AddTextBtn';
import { useFormContext } from 'react-hook-form';

import QuantityRow from '../QuantityRow';

interface IQuantityTable {
  idx: number;
}

const QuantityTable = ({ idx }: IQuantityTable) => {
  const { watch, setValue } = useFormContext();

  const { quantityAttributes } = watch();
  const handleAddInput = () => {
    setValue(
      `quantityAttributes[${idx}].attributes`,
      [...quantityAttributes[idx].attributes,
        { inkId: '', turnAroundIds: [] }],
    );
  };

  return (
    <StyledTableContainer sx={{ marginBottom: '16px' }}>
      <StyledMuiTable>
        <TableHead>
          <StyledTableRow>
            <TableCell>QUANTITY</TableCell>
            <TableCell>
              <Stack direction="row" justifyContent="space-between">
                <Typography>INK & TURN AROUND</Typography>
                <AddTextBtn text="+Add new Ink" handleAdd={handleAddInput} />
              </Stack>
            </TableCell>
            <TableCell>Actions</TableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          <QuantityRow tableIdx={idx} />
        </TableBody>
      </StyledMuiTable>
    </StyledTableContainer>
  );
};

export default memo(QuantityTable);
