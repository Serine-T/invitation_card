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
import ErrorMessage from '@containers/common/ErrorMessage';

import { unitDisplayList, valCases } from './helpers';

const GrandFormatOptions = () => {
  const { formState: { errors, isSubmitted }, register, watch } = useFormContext();

  const { grandFormatOptions: { widthFrom, widthTo, heightFrom, heightTo } } = watch();

  return (
    <Box mt="24px">
      <StyledTable tableTitle="GRAND FORMAT PRODUCT OPTIONS" colSpan={2}>
        <RowComponent label="Unit Display (Not used now)">
          <Select
            width="140px"
            name="grandFormatOptions.unitDisplay"
            errorMessage={(errors as any)?.grandFormatOptions?.unitDisplay?.message}
            options={unitDisplayList}
          />
        </RowComponent>
        <StyledTableRow>
          <StyledTableCell rowSpan={2}>
            Dimension Ranges (in FT for drop down ranges):
          </StyledTableCell>
          <TableCell>
            <Stack direction="row" alignItems="center" gap="8px">
              <Typography>Width</Typography>
              <Input
                width="95px"
                placeholder="Width from"
                {...register('grandFormatOptions.widthFrom')}
                errorMessage={(errors as any)?.grandFormatOptions?.widthFrom?.message}
              />
              <Typography>--</Typography>
              <Input
                width="95px"
                placeholder="Width to"
                {...register('grandFormatOptions.widthTo')}
                errorMessage={(errors as any)?.grandFormatOptions?.widthTo?.message}
              />
            </Stack>
            {isSubmitted && widthFrom && widthTo && (+widthFrom > +widthTo) && (
            <Box mt="6px">
              <ErrorMessage mt="16px" message={valCases.isGreaterThanWidth} />
            </Box>
            )}
          </TableCell>
        </StyledTableRow>

        <StyledTableRow>
          <TableCell>
            <Stack direction="row" alignItems="center" gap="8px">
              <Typography>Height</Typography>
              <Input
                width="95px"
                placeholder="Height from"
                {...register('grandFormatOptions.heightFrom')}
                errorMessage={(errors as any)?.grandFormatOptions?.heightFrom?.message}
              />
              <Typography>--</Typography>
              <Input
                width="95px"
                placeholder="Height to"
                {...register('grandFormatOptions.heightTo')}
                errorMessage={(errors as any)?.grandFormatOptions?.heightTo?.message}
              />
            </Stack>
            {isSubmitted && heightFrom && heightTo && (+heightFrom > +heightTo) && (
              <Box mt="6px">
                <ErrorMessage message={valCases.isGreaterThanHeight} />
              </Box>

            )}
          </TableCell>
        </StyledTableRow>
        <RowComponent label=" Max Size Limit in INCHES">
          <Stack direction="row" alignItems="center" gap="8px">
            <Input
              width="95px"
              placeholder="Max width"
              {...register('grandFormatOptions.maxWidth')}
              errorMessage={(errors as any)?.grandFormatOptions?.maxWidth?.message}
            />
            <Typography>in</Typography>
            <Typography>x</Typography>
            <Input
              width="95px"
              placeholder="Max height"
              {...register('grandFormatOptions.maxHeight')}
              errorMessage={(errors as any)?.grandFormatOptions?.maxHeight?.message}
            />
            <Typography>in</Typography>
          </Stack>
        </RowComponent>
      </StyledTable>
    </Box>
  );
};

export default memo(GrandFormatOptions);
