import { memo } from 'react';

import { Box, Stack, Typography } from '@mui/material';
import { useFormContext } from 'react-hook-form';

import AttributeItem from '../AttributeItem';
import { IAttribute } from '../InputsTable/helpers';

interface IAttributesContainer {
  sectionTitle: string;
  btn?: boolean;
  attrCategoryIdx: number;
}

const AttributesContainer = ({ sectionTitle, btn, attrCategoryIdx }: IAttributesContainer) => {
  const { watch } = useFormContext();
  const attributes = watch(`attributesList.${attrCategoryIdx}.attributes`);

  const hasSelectedAttributes = attributes.some((attr:IAttribute) => attr.isSelected);

  return (!!attributes.length && btn && !hasSelectedAttributes ? null : (
    <Box mt="25px">
      <Typography variant="h10">
        {sectionTitle}
      </Typography>
      <Stack
        direction="row"
        gap="10px"
        mt="15px"
      >
        {attributes.map((item: IAttribute, attributeIdx: number) => (
          <AttributeItem
            key={item.id}
            {...item}
            attrCategoryIdx={attrCategoryIdx}
            attributeIdx={attributeIdx}
            btn={btn}
          />
        ))}
      </Stack>
    </Box>
  )

  );
};

export default memo(AttributesContainer);
