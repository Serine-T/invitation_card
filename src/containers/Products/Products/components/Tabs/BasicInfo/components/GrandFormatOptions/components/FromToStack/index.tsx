import { ReactNode, memo } from 'react';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

interface IFromToStack {
  text?: string;
  children: ReactNode;
}

const FromToStack = ({ text, children }: IFromToStack) => (
  <Stack direction="row" gap="8px">
    {text && (
    <Stack direction="row" alignItems="center" height="36px">
      <Typography>{text}</Typography>
    </Stack>
    )}
    <Stack direction="row" gap="8px">
      {children}
    </Stack>
  </Stack>
);

export default memo(FromToStack);
