import { memo } from 'react';

import Stack from '@mui/material/Stack';
import Input from '@containers/common/Input';
import { useFormContext } from 'react-hook-form';
import Checkbox from '@containers/common/Checkbox';
import Typography from '@mui/material/Typography';

interface IStyledSTack {
  rowIdx: number;
  attrIdx: number;
  attrRowIdx: number;
}

const StyledSTack = ({ rowIdx, attrIdx, attrRowIdx }: IStyledSTack) => {
  const { watch, register, formState: { errors } } = useFormContext();
  const { attributes, name: catName } = watch(`quantities[${rowIdx}].attributeCategories[${attrIdx}]`);
  const { nickname } = attributes[attrRowIdx];
  const isTurnAround = catName.toLowerCase() === 'Turn Around'.toLowerCase();

  return (
    <Stack gap="16px">
      <Stack direction="row" alignItems="center" flexWrap="wrap">
        {isTurnAround && (
        <Checkbox
          name={
        `quantities[${rowIdx}].attributeCategories[${attrIdx}].attributes[${attrRowIdx}].isVisible`
}
        />
        )}
        <Typography>
          {nickname}
        </Typography>
      </Stack>

      <Input
        width="100px"
        placeholder="Price"
        {...register(`quantities[${rowIdx}].attributeCategories[${attrIdx}].attributes[${attrRowIdx}].price`)}
        errorMessage={(errors as any)
          ?.quantities?.[rowIdx]?.attributeCategories?.[attrIdx]?.attributes?.[attrRowIdx]?.price?.message}
      />
    </Stack>
  );
};

export default memo(StyledSTack);
