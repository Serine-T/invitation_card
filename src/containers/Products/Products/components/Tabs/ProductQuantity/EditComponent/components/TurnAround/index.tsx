import { memo } from 'react';

import Select from '@containers/common/Select';
import { useFormContext } from 'react-hook-form';
import { getOptionsArray } from '@utils/helpers';
import { useAppSelector } from '@features/app/hooks';
import { selectAttributes } from '@features/attributes/selectors';

import { StyledCloseIcon } from '../MiddleCell/styles';
import { StyledStack } from '../../styles';

interface ITurnAround{
  tableIdx: number;
  rowIdx: number;
  turnAroundIdx:number;
}

const TurnAround = ({ rowIdx, tableIdx, turnAroundIdx }: ITurnAround) => {
  const { setValue, watch, formState: { errors } } = useFormContext();
  const quantityAttributes = watch('quantityAttributes');
  const { turnAroundsAttributes } = useAppSelector(selectAttributes);

  const currentAttribute = quantityAttributes[tableIdx].attributes[rowIdx];
  const { turnAroundIds } = currentAttribute;
  const turnAroundsOptions = getOptionsArray(turnAroundsAttributes, 'name');

  const handleRemoveTurnAround = () => {
    const newTurnArounds = turnAroundIds.filter((_: any, i: number) => i !== turnAroundIdx);

    setValue(`quantityAttributes[${tableIdx}].attributes[${rowIdx}].turnAroundIds`, newTurnArounds);
  };

  return (
    <StyledStack direction="row">
      <StyledCloseIcon onClick={handleRemoveTurnAround} />
      <Select
        width="240px"
        name={`quantityAttributes[${tableIdx}].attributes[${rowIdx}].turnAroundIds[${turnAroundIdx}].turnAroundId`}
        options={turnAroundsOptions}
        errorMessage={(errors as any)?.quantityAttributes?.[
          tableIdx]?.attributes?.[rowIdx]?.turnAroundIds?.[turnAroundIdx]?.turnAroundId?.message}
      />
    </StyledStack>
  );
};

export default memo(TurnAround);
