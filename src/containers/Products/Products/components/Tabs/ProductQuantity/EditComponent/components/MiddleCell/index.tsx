import { memo } from 'react';

import Select from '@containers/common/Select';
import AddTextBtn from '@containers/common/Table/components/AddTextBtn';
import { useFormContext } from 'react-hook-form';
import { useAppSelector } from '@features/app/hooks';
import { selectAttributes } from '@features/attributes/selectors';
import { getOptionsArray } from '@utils/helpers';

import { StyledCloseIcon, StyledMiddleCell } from './styles';
import { StyledStack } from '../../styles';
import TurnAround from '../TurnAround';

interface IMiddleCell{
  tableIdx: number;
  rowIdx:number;
}

const MiddleCell = ({ rowIdx, tableIdx }: IMiddleCell) => {
  const { setValue, watch, formState: { errors } } = useFormContext();
  const { inksAttributes } = useAppSelector(selectAttributes);
  const { quantityAttributes } = watch();
  const { attributes } = quantityAttributes[tableIdx];
  const { turnAroundIds } = attributes[rowIdx];

  const inksOptions = getOptionsArray(inksAttributes, 'name');

  const handleAddInput = () => {
    setValue(
      `quantityAttributes[${tableIdx}].attributes[${rowIdx}].turnAroundIds`,
      [...turnAroundIds, { turnAroundId: '' }],
    );
  };

  const handleRemoveInk = () => {
    const newAttributes = attributes.filter((_: any, i: number) => i !== rowIdx);

    setValue(`quantityAttributes[${tableIdx}].attributes`, newAttributes);
  };

  return (
    <StyledMiddleCell>
      <StyledStack direction="row">
        <StyledCloseIcon onClick={handleRemoveInk} />
        <Select
          width="75px"
          name={`quantityAttributes[${tableIdx}].attributes[${rowIdx}].inkId`}
          options={inksOptions}
          errorMessage={(errors as any)?.quantityAttributes?.[tableIdx]?.attributes[rowIdx]?.inkId?.message}
        />
        <AddTextBtn text="+Add Turn Around" handleAdd={handleAddInput} />
      </StyledStack>

      {turnAroundIds.map((_: any, turnAroundIdx: number) => (
        <TurnAround
          // eslint-disable-next-line react/no-array-index-key
          key={turnAroundIdx}
          rowIdx={rowIdx}
          tableIdx={tableIdx}
          turnAroundIdx={turnAroundIdx}
        />
      ))}
    </StyledMiddleCell>
  );
};

export default memo(MiddleCell);
