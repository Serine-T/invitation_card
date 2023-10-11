import { memo } from 'react';

import { StyledTableRow } from '@containers/common/Table/styled';
import TableCell from '@mui/material/TableCell';
import { useFormContext } from 'react-hook-form';
import { StyledTableCell } from '@containers/common/StyledAddEditTables/styled';
import Input from '@containers/common/Input';
import StyledTable from '@containers/common/Table';
import StyledTypography from '@containers/common/StyledTypography';
import Typography from '@mui/material/Typography';
import { useAppDispatch } from '@features/app/hooks';
import { deleteProductsQuantity, getAllProductsQuantities } from '@features/products/productsQuantity/actions';
import { useParams } from 'react-router-dom';

import { headCells } from './tableData';

interface IQuantityTable {
  idx: number;
}

const QuantityTable = ({ idx }: IQuantityTable) => {
  const dispatch = useAppDispatch();
  const { register, formState: { errors }, watch } = useFormContext();
  const { id } = useParams();

  const { quantity, id: quantityId } = watch(`quantities[${idx}]`);
  const handleDelete = () => {
    dispatch(deleteProductsQuantity({ productId: id as string, quantityId })).unwrap().then(() => {
      dispatch(getAllProductsQuantities(id as string)).unwrap().then(() => {}).catch(() => { });
    }).catch(() => {});
  };

  return (
    <StyledTable headCells={headCells}>
      <StyledTableRow>
        <StyledTableCell>
          <Typography>
            {quantity}
          </Typography>
        </StyledTableCell>
        <TableCell>
          <Input
            placeholder="Base price"
            {...register(`quantities[${idx}].basePrice`)}
            errorMessage={errors?.quantity?.message as any}
          />
        </TableCell>
        <TableCell>
          <StyledTypography
            color="blue"
            variant="body3"
            cursor="pointer"
            onClick={handleDelete}
          >
            Delete
          </StyledTypography>
        </TableCell>
      </StyledTableRow>
    </StyledTable>
  );
};

export default memo(QuantityTable);
