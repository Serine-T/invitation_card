import { memo } from 'react';

import Input from '@containers/common/Input';
import Typography from '@mui/material/Typography';
import { useFormContext } from 'react-hook-form';

import { StyledStack } from '../../../../../../ProductQuantity/EditComponent/styles';

interface IInkTurnAroundStack {
  name: string;
  field: string;
  errorMessage?: string;
}

const InkTurnAroundStack = ({ name, field, errorMessage }: IInkTurnAroundStack) => {
  const { register } = useFormContext();

  return (
    <StyledStack direction="row" justifyContent="space-between" mr="30px">
      <Typography variant="body3">{name}</Typography>
      <Input
        width="80px"
        placeholder="00.00"
        {...register(field)}
        errorMessage={errorMessage}
      />
    </StyledStack>
  );
};

export default memo(InkTurnAroundStack);
