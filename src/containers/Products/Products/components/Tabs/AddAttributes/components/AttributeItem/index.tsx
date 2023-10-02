import { memo } from 'react';

import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import CloseIcon from '@mui/icons-material/Close';

interface IAttributeItem {
  title: string;
  btn?: boolean;
}

const AttributeItem = ({ title, btn }: IAttributeItem) => {
  return (
    <Stack
      direction="row"
      gap="10px"
      sx={{
        border: '1px solid red',
        alignItems: 'center',
        padding: '9px 12px',
        borderRadius: '4px',
      }}
    >
      <Typography variant="body3">{title}</Typography>
      {btn && (
      <CloseIcon
        cursor="pointer"
        fontSize="inherit"
      />
      )}
    </Stack>
  );
};

export default memo(AttributeItem);
