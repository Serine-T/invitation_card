import { memo } from 'react';

import TableCell from '@mui/material/TableCell';
import StyledTable from '@containers/common/Table';
import { StyledTableRow } from '@containers/common/Table/styled';
import { StyledTableCell } from '@containers/common/StyledAddEditTables/styled';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Select from '@containers/common/Select';
import { useFormContext } from 'react-hook-form';
import Input from '@containers/common/Input';
import RowComponent from '@containers/common/Table/components/RowComponent';

import { unitDisplayList } from './helpers';

const GrandFormatOptions = () => {
  const { formState: { errors }, register } = useFormContext();

  return (
    <Box mt="24px">
      <StyledTable tableTitle="GRAND FORMAT PRODUCT OPTIONS" colSpan={2}>
        <RowComponent label="Unit Display (Not used now):">
          <Select
            width="140px"
            name="grandFormatOptions.unitDisplay"
            errorMessage={(errors as any)?.grandFormatOptions?.unitDisplay?.message}
            options={unitDisplayList}
          />
        </RowComponent>
        <StyledTableRow>
          <StyledTableCell rowSpan={2}>
            Dimension Ranges (in FT for drop down ranges)   Unit Display (Not used now):
          </StyledTableCell>
          <TableCell>
            <Stack direction="row" alignItems="center" gap="8px">
              <Typography>Width</Typography>
              <Input
                width="95px"
                type="text"
                placeholder="Width from"
                {...register('grandFormatOptions.widthFrom')}
                errorMessage={(errors as any)?.grandFormatOptions?.widthFrom?.message}
              />
              <Typography>--</Typography>
              <Input
                width="95px"
                type="text"
                placeholder="Width to"
                {...register('grandFormatOptions.widthTo')}
                errorMessage={(errors as any)?.grandFormatOptions?.widthTo?.message}
              />
            </Stack>
          </TableCell>
        </StyledTableRow>

        <StyledTableRow>
          <TableCell>
            <Stack direction="row" alignItems="center" gap="8px">
              <Typography>Height</Typography>
              <Input
                width="95px"
                type="text"
                placeholder="Height from"
                {...register('grandFormatOptions.heightFrom')}
                errorMessage={(errors as any)?.grandFormatOptions?.heightFrom?.message}
              />
              <Typography>--</Typography>
              <Input
                width="95px"
                type="text"
                placeholder="Height to"
                {...register('grandFormatOptions.heightTo')}
                errorMessage={(errors as any)?.grandFormatOptions?.heightTo?.message}
              />
            </Stack>
          </TableCell>
        </StyledTableRow>
        <RowComponent label=" Max Size Limit in INCHES:">
          <Stack direction="row" alignItems="center" gap="8px">
            <Input
              width="95px"
              type="text"
              placeholder="Max width"
              {...register('grandFormatOptions.maxWidth')}
              errorMessage={(errors as any)?.grandFormatOptions?.maxHeight?.message}
            />
            <Typography>in</Typography>
            <Typography>x</Typography>
            <Input
              width="95px"
              type="text"
              placeholder="Max height"
              {...register('grandFormatOptions.maxHeight')}
              errorMessage={(errors as any)?.grandFormatOptions?.maxWidth?.message}
            />
            <Typography>in</Typography>
          </Stack>
        </RowComponent>
      </StyledTable>
    </Box>
  );
};

export default memo(GrandFormatOptions);
