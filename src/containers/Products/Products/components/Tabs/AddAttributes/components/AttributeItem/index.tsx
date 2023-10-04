import { memo } from 'react';

import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';

import { StyledAttributeStack } from './styles';

interface IAttributeItem {
  title: string;
  btn?: boolean;
}

const AttributeItem = ({ title, btn }: IAttributeItem) => {
  return (
    <StyledAttributeStack
      isSelected={false}
      direction="row"
      gap="10px"

    >
      <Typography variant="body3">{title}</Typography>
      {btn && (
      <CloseIcon
        cursor="pointer"
        fontSize="inherit"
      />
      )}
    </StyledAttributeStack>
  );
};

export default memo(AttributeItem);
