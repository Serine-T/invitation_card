import { memo, useState } from 'react';

import Box from '@mui/material/Box';
import { useFormContext } from 'react-hook-form';
import Input from '@containers/common/Input';
import StyledTable from '@containers/common/Table';
import { StyledTableRow } from '@containers/common/Table/styled';
import { StyledTableCell } from '@containers/common/StyledAddEditTables/styled';
import Stack from '@mui/material/Stack';
import TableCell from '@mui/material/TableCell';
import MinusIcon from '@containers/common/Icons/MinusIcon';
import AddTextBtn from '@containers/common/Table/components/AddTextBtn';

import { inputsFields } from './helpers';

const GrandFormatDiscounts = () => {
  const { register, setValue, watch, formState: { errors } } = useFormContext();

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
        btn={<AddTextBtn text="+Add more" handleAdd={handleAddInput} />}
      >
        {!!inputList.length && inputList.map((_, index) => (
          inputsFields.map(({ label, field, placeholder }, idx) => (
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
                    errorMessage={(errors as any)?.grandFormatOptions?.grandFormatDiscounts?.[index]?.[field]?.message}
                  />
                  {inputList.length > 1 && idx === 0 && (
                  <MinusIcon
                    cursor="pointer"
                    onClick={() => handleRemoveInput(index)}
                  />
                  )}
                </Stack>
              </TableCell>
            </StyledTableRow>
          ))))}
      </StyledTable>
    </Box>
  );
};

export default memo(GrandFormatDiscounts);
