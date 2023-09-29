import { memo } from 'react';

import Box from '@mui/material/Box';
import ErrorMessage from '@containers/common/ErrorMessage';

interface IFromToErrorMessage {
  message: string;
}

const FromToErrorMessage = ({ message }: IFromToErrorMessage) => (
  <Box mt="6px" ml="50">
    <ErrorMessage message={message} />
  </Box>
);

export default memo(FromToErrorMessage);
