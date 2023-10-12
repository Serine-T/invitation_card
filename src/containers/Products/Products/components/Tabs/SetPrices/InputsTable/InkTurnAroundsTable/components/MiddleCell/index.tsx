/* eslint-disable react/no-array-index-key */
import { memo } from 'react';

import { useFormContext } from 'react-hook-form';
import { Stack } from '@mui/material';

import InkTurnAroundStack from '../InkTurnAroundStack';

interface IMiddleCell {
  tableIdx: number;
  rowIdx: number;
}

const MiddleCell = ({ tableIdx, rowIdx }: IMiddleCell) => {
  const { formState: { errors }, watch } = useFormContext();
  const { ink, quantityInkTurnAround } = watch(`productsPrices[${tableIdx}].quantityInk[${rowIdx}]`);

  return (
    <Stack>
      <InkTurnAroundStack
        nickname={ink.nickname}
        field={`productsPrices[${tableIdx}].quantityInk[${rowIdx}].price`}
        errorMessage={(errors as any)?.productsPrices?.[tableIdx]?.quantityInk?.rowIdx?.price?.message as string}
      />
      {quantityInkTurnAround.map(({ turnAround }: any, turnAroundIdx: number) => (
        <InkTurnAroundStack
          key={turnAroundIdx}
          nickname={turnAround.nickname}
          field={`productsPrices[${tableIdx}].quantityInk[${rowIdx}].quantityInkTurnAround[${turnAroundIdx}].price`}
          errorMessage={(errors as any)?.productsPrices?.[tableIdx]
            ?.quantityInk?.rowIdx?.quantityInkTurnAround?.turnAroundIdx?.price?.message as string}
        />
      ))}
    </Stack>
  );
};

export default memo(MiddleCell);
