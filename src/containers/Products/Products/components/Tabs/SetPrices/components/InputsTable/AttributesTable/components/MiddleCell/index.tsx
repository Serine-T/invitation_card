import { memo } from 'react';

import { useFormContext } from 'react-hook-form';
import Input from '@containers/common/Input';
import Stack from '@mui/material/Stack';
import Checkbox from '@containers/common/Checkbox';
import Typography from '@mui/material/Typography';

import { StyledMiddleCell } from '../../../../../../ProductQuantity/EditComponent/components/MiddleCell/styles';

interface IMiddleCell {
  tableIdx: number;
  rowIdx: number;
}

const MiddleCell = ({ tableIdx, rowIdx }: IMiddleCell) => {
  const { formState: { errors }, watch, register } = useFormContext();
  const { attributes } = watch(`productsPrices.${tableIdx}.quantityAttributes.${rowIdx}`);

  return (
    attributes.map(({ name }: any, attrIdx: number) => (
      // eslint-disable-next-line react/no-array-index-key
      <StyledMiddleCell key={attrIdx}>
        <Stack direction="row" alignItems="center">
          <Checkbox
            name={
            `productsPrices.${tableIdx}.quantityAttributes.${rowIdx}.attributes.${attrIdx}.isVisible`
}
          />
          <Typography variant="body3" mr="16px">{name}</Typography>
          <Input
            width="80px"
            placeholder="00.00"
            {...register(
              `productsPrices.${tableIdx}.quantityAttributes.${rowIdx}.attributes.${attrIdx}.price`,
            )}
            errorMessage={(errors as any)?.productsPrices?.[tableIdx]?.basePrice?.message as string}
          />
        </Stack>
      </StyledMiddleCell>
    )));
};

export default memo(MiddleCell);
