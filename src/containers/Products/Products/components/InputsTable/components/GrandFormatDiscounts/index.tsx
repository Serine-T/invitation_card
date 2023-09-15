import { memo, useState } from 'react';

import Box from '@mui/material/Box';
import { useFormContext } from 'react-hook-form';
import Input from '@containers/common/Input';
import StyledTable from '@containers/common/Table';
import { StyledTableRow } from '@containers/common/Table/styled';
import { StyledTableCell } from '@containers/common/StyledAddEditTables/styled';
import { Stack, TableCell } from '@mui/material';
import StyledTypography from '@containers/common/StyledTypography';
import MinusIcon from '@containers/common/Icons/MinusIcon';

import { inputsFields } from './helpers';

const GrandFormatDiscounts = () => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const { grandFormatOptions = {} } = watch();

  const options = grandFormatOptions?.grandFormatDiscounts || [];

  const [inputList, setInputList] = useState<any[]>(options);
  const handleAddInput = () => {
    const newInput = { quantity: null, discountPercent: null };

    setValue('grandFormatOptions.grandFormatDiscounts', [...options, newInput]);

    setInputList([...inputList, newInput]);
  };

  const handleRemoveInput = (index: number) => {
    const values = [...inputList] as any[][];

    values.splice(index, 1);
    setInputList(values);

    const copyFormValues = [...options];

    copyFormValues.splice(index, 1);
    setValue('grandFormatOptions.grandFormatDiscounts', copyFormValues);
  };

  return (
    <Box mt="24px">
      <StyledTable
        tableTitle="GRAND FORMAT VOLUME PRICING DISCOUNTS"
        colSpan={2}
        btn={(
          <StyledTypography
            variant="body3"
            color="blue"
            cursor="pointer"
            onClick={handleAddInput}
          >
            Add more +
          </StyledTypography>
      )}
      >
        {!!inputList.length && inputList.map((_, index) => {
          return (
            <>
              {inputsFields.map(({ label, field, placeholder }, idx) => (
                <StyledTableRow key={label}>
                  <StyledTableCell>
                    {label}
                  </StyledTableCell>
                  <TableCell>
                    <Stack direction="row" justifyContent="space-between">
                      <Input
                        width="275px"
                        {...register(`grandFormatOptions.grandFormatDiscounts.${index}.${field}`)}
                        placeholder={placeholder}
                        errorMessage={(errors as any)
                          ?.grandFormatOptions?.grandFormatDiscounts?.[index]?.[field]?.message}
                      />
                      {index !== 0 && idx === 0 && (
                        <MinusIcon onClick={() => handleRemoveInput(index)} />
                      )}
                    </Stack>
                  </TableCell>
                </StyledTableRow>
              ))}
            </>
          );
        })}
      </StyledTable>
    </Box>
  );
};

export default memo(GrandFormatDiscounts);
