import { memo } from 'react';

import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import { useFormContext } from 'react-hook-form';

import { StyledAttributeStack } from './styles';

interface IAttributeItem {
  btn?: boolean;
  attributeIdx: number;
  attrCategoryIdx: number;
}

const AttributeItem = ({ btn, attributeIdx, attrCategoryIdx }: IAttributeItem) => {
  const { setValue, watch } = useFormContext();

  const attributesList = watch('attributesList');

  const item = attributesList[attrCategoryIdx].attributes[attributeIdx];

  const { name, isSelected } = item;

  const handleAdding = () => {
    if (!btn) {
      const updatedAttributesList = [...attributesList];
      const currentAttribute = updatedAttributesList[attrCategoryIdx].attributes[attributeIdx];

      currentAttribute.isSelected = true;

      setValue('attributesList', updatedAttributesList);
    }
  };

  const handleRemove = () => {
    const updatedAttributesList = [...attributesList];
    const currentAttribute = updatedAttributesList[attrCategoryIdx].attributes[attributeIdx];

    currentAttribute.isSelected = false;

    setValue('attributesList', updatedAttributesList);
  };

  return btn && !isSelected ? null : (
    <StyledAttributeStack
      isSelected={!!isSelected}
      direction="row"
      gap="10px"
      btn={btn}
      onClick={handleAdding}

    >
      <Typography variant="body3">{name}</Typography>
      {btn && (
        <CloseIcon
          onClick={handleRemove}
          cursor="pointer"
          fontSize="inherit"
        />
      )}
    </StyledAttributeStack>
  );
};

export default memo(AttributeItem);
