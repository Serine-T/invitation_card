import { memo } from 'react';

import { useFormContext } from 'react-hook-form';
import Input from '@containers/common/Input';
import Stack from '@mui/material/Stack';
import Checkbox from '@containers/common/Checkbox';
import Typography from '@mui/material/Typography';

interface IMiddleCell {
  tableIdx: number;
  rowIdx: number;
}

const MiddleCell = ({ tableIdx, rowIdx }: IMiddleCell) => {
  const { formState: { errors }, watch, register } = useFormContext();
  const { attributes } = watch(`productsPrices[${tableIdx}].quantityAttributes[${rowIdx}]`);

  return (
    <Stack gap="10px">
      { attributes.map(({ nickname }: any, attrIdx: number) => (
      // eslint-disable-next-line react/no-array-index-key
        <Stack key={attrIdx} direction="row" alignItems="center" justifyContent="space-between">
          <Stack direction="row" alignItems="center">
            <Checkbox
              name={
            `productsPrices[${tableIdx}].quantityAttributes[${rowIdx}].attributes[${attrIdx}].isVisible`
}
            />
            <Typography variant="body3" mr="16px">{nickname}</Typography>
          </Stack>

          <Input
            width="80px"
            placeholder="00.00"
            {...register(
              `productsPrices[${tableIdx}].quantityAttributes[${rowIdx}].attributes[${attrIdx}].price`,
            )}
            errorMessage={(errors as any)?.productsPrices?.[tableIdx]?.basePrice?.message as string}
          />

        </Stack>

      ))}
    </Stack>
  );
};

export default memo(MiddleCell);
