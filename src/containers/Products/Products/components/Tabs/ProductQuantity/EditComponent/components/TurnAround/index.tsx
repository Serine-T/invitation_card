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
  const { setValue, watch } = useFormContext();
  const quantityAttributes = watch('quantityAttributes');
  const { turnAroundsAttributes } = useAppSelector(selectAttributes);

  const currentAttribute = quantityAttributes[tableIdx].attributes[rowIdx];
  const { turnAroundIds, turnAroundIds: [{ turnAroundId }] } = currentAttribute;
  const turnAroundsOptions = getOptionsArray(turnAroundsAttributes, 'name');

  const handleRemoveTurnAround = () => {
    const newTurnArounds = turnAroundIds.filter((item: any) => item.turnAroundId !== turnAroundId);

    setValue(`quantityAttributes[${tableIdx}].attributes[${rowIdx}].turnAroundIds`, newTurnArounds);
  };

  return (
    <StyledStack direction="row">
      <StyledCloseIcon onClick={handleRemoveTurnAround} />
      <Select
        width="240px"
        name={`quantityAttributes[${tableIdx}].attributes[${rowIdx}].turnAroundIds[${turnAroundIdx}].turnAroundId`}
        options={turnAroundsOptions}
      />
    </StyledStack>
  );
};

export default memo(TurnAround);
