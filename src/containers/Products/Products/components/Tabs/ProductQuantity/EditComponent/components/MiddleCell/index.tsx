import { memo, useState } from 'react';

import Select from '@containers/common/Select';
import AddTextBtn from '@containers/common/Table/components/AddTextBtn';
import { useFormContext } from 'react-hook-form';

import { StyledCloseIcon, StyledMiddleCell } from './styles';
import { StyledStack } from '../../styles';

interface IMiddleCell{
  inkId: any;
  turnArounds: any; // TODO: change typing
  idx: number;
}

const MiddleCell = ({ inkId, turnArounds, idx }: IMiddleCell) => {
  const { setValue, watch } = useFormContext();

  console.log('waaa', watch());

  const [inputList, setInputList] = useState<any[]>(turnArounds);
  const handleAddInput = () => {
    const newInput = { quantity: null, discountPercent: null };

    setValue('grandFormatOptions.grandFormatDiscounts', [...turnArounds, newInput]);

    setInputList([...inputList, newInput]);
  };

  const handleRemoveInput = () => {
    const values = [...inputList] as any[][];

    values.splice(idx, 1);
    setInputList(values);

    const copyFormValues = [...turnArounds];

    copyFormValues.splice(idx, 1);
    setValue('grandFormatOptions.grandFormatDiscounts', copyFormValues);
  };

  return (
    <StyledMiddleCell key={inkId}>
      <StyledStack direction="row">
        <StyledCloseIcon />
        <Select
          width="75px"
          name="inkId"
          options={[]}
        />
        <AddTextBtn text="+Add Turn Around" handleAdd={handleAddInput} />
      </StyledStack>

      {inputList.map((i: any) => (
        <StyledStack key={i} direction="row">
          <StyledCloseIcon onClick={handleRemoveInput} />
          <Select
            key={i}
            width="240px"
            name="subCategoryId"
            options={[]}
          />
        </StyledStack>
      ))}
    </StyledMiddleCell>
  );
};

export default memo(MiddleCell);
