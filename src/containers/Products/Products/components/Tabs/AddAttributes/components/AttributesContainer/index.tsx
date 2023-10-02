import { memo } from 'react';

import { Box, Stack, Typography } from '@mui/material';

import AttributeItem from '../AttributeItem';

interface IAttributesContainer {
  sectionTitle: string;
  data: any[];
  btn?: boolean;
}

const AttributesContainer = ({ sectionTitle, data, btn }: IAttributesContainer) => {
  return (
    <Box mt="25px">
      <Typography variant="h10">
        {sectionTitle}
      </Typography>
      <Stack
        direction="row"
        gap="10px"
        mt="15px"
      >
        {data.map(({ title }) => (
          <AttributeItem key={title} title={title} btn={btn} />
        ))}
      </Stack>
    </Box>

  );
};

export default memo(AttributesContainer);
