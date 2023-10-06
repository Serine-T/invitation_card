/* eslint-disable react/no-array-index-key */
import { memo } from 'react';

import { useFormContext } from 'react-hook-form';

import InkTurnAroundStack from '../InkTurnAroundStack';
import { StyledMiddleCell } from '../../../../../ProductQuantity/EditComponent/components/MiddleCell/styles';

interface IMiddleCell {
  tableIdx: number;
  rowIdx: number;
}

const MiddleCell = ({ tableIdx, rowIdx }: IMiddleCell) => {
  const { formState: { errors }, watch } = useFormContext();
  const { ink, quantityInkTurnAround } = watch(`productsPrices[${tableIdx}].quantityInk[${rowIdx}]`);

  return (
    <StyledMiddleCell>
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
    </StyledMiddleCell>
  );
};

export default memo(MiddleCell);
