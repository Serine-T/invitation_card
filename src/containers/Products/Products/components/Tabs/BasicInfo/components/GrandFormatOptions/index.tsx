import { memo } from 'react';

import TableCell from '@mui/material/TableCell';
import StyledTable from '@containers/common/Table';
import { StyledTableRow } from '@containers/common/Table/styled';
import { StyledTableCell } from '@containers/common/StyledAddEditTables/styled';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Select from '@containers/common/Select';
import { useFormContext } from 'react-hook-form';
import RowComponent from '@containers/common/Table/components/RowComponent';

import { unitDisplayList, valCases } from './helpers';
import FromToStack from './components/FromToStack';
import TextStack from './components/MinusStack';
import { StyledInput, StyledTextStack } from './styles';
import FromToErrorMessage from './components/FromToErrorMessage';

const GrandFormatOptions = () => {
  const { formState: { errors, isSubmitted }, register, watch } = useFormContext();
  const { grandFormatOptions: { widthFrom, widthTo, heightFrom, heightTo } } = watch();
  const isGreaterThanWidth = isSubmitted && widthFrom && widthTo && (+widthFrom > +widthTo);
  const isGreaterThanHeight = isSubmitted && heightFrom && heightTo && (+heightFrom > +heightTo);

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
            <FromToStack text="Width">
              <StyledInput
                placeholder="Width from"
                {...register('grandFormatOptions.widthFrom')}
                errorMessage={(errors as any)?.grandFormatOptions?.widthFrom?.message}
              />
              <TextStack />
              <StyledInput
                placeholder="Width to"
                {...register('grandFormatOptions.widthTo')}
                errorMessage={(errors as any)?.grandFormatOptions?.widthTo?.message}
              />
            </FromToStack>
            {isGreaterThanWidth && <FromToErrorMessage message={valCases.isGreaterThanWidth} />}
          </TableCell>
        </StyledTableRow>

        <StyledTableRow>
          <TableCell>
            <FromToStack text="Height">
              <StyledInput
                placeholder="Height from"
                {...register('grandFormatOptions.heightFrom')}
                errorMessage={(errors as any)?.grandFormatOptions?.heightFrom?.message}
              />
              <TextStack />
              <StyledInput
                placeholder="Height to"
                {...register('grandFormatOptions.heightTo')}
                errorMessage={(errors as any)?.grandFormatOptions?.heightTo?.message}
              />
            </FromToStack>
            {isGreaterThanHeight && <FromToErrorMessage message={valCases.isGreaterThanHeight} />}
          </TableCell>
        </StyledTableRow>
        <RowComponent label=" Max Size Limit in INCHES">
          <FromToStack>
            <StyledInput
              placeholder="Max width"
              {...register('grandFormatOptions.maxWidth')}
              errorMessage={(errors as any)?.grandFormatOptions?.maxWidth?.message}
            />
            <StyledTextStack>
              <Typography>in</Typography>
              <Typography>x</Typography>
            </StyledTextStack>
            <StyledInput
              placeholder="Max height"
              {...register('grandFormatOptions.maxHeight')}
              errorMessage={(errors as any)?.grandFormatOptions?.maxHeight?.message}
            />
            <StyledTextStack>in</StyledTextStack>
          </FromToStack>
        </RowComponent>
      </StyledTable>
    </Box>
  );
};

export default memo(GrandFormatOptions);
