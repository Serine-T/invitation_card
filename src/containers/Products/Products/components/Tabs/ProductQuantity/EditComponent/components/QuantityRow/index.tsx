import { memo } from 'react';

import { StyledTableRow } from '@containers/common/Table/styled';
import TableCell from '@mui/material/TableCell';
import { useFormContext } from 'react-hook-form';
import StyledTypography from '@containers/common/StyledTypography';

import MiddleCell from '../MiddleCell';

interface IQuantityRow{
tableIdx: number;
}

const QuantityRow = ({ tableIdx }: IQuantityRow) => {
  const { watch, setValue } = useFormContext();
  const { quantityAttributes } = watch();
  const { attributes, quantityName, quantityId } = quantityAttributes[tableIdx];

  const handleDelete = () => {
    const newData = quantityAttributes.filter((item: any) => item.quantityId !== quantityId);

    setValue('quantityAttributes', newData);
  };

  return (
    <StyledTableRow key={quantityName}>
      <TableCell>{quantityName}</TableCell>
      <TableCell sx={{ padding: '0 !important' }}>
        {attributes.map((_: any, rowIdx: number) => (
          <MiddleCell
            // eslint-disable-next-line react/no-array-index-key
            key={rowIdx}
            rowIdx={rowIdx}
            tableIdx={tableIdx}
          />
        ))}
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
  );
};

export default memo(QuantityRow);
