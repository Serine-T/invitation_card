import { useTimer } from 'react-timer-hook';
import Stack from '@mui/material/Stack';

import { StyledDivider } from './styled';
import DateItem from './DateItem';

const Timer = () => {
  const now = new Date();
  const expiryTimestamp = new Date(now.getFullYear(), 0, 24, 18, 0, 0);

  const {
    days,
    hours,
    minutes,
    seconds,
  } = useTimer({ expiryTimestamp });

  return (
    <Stack direction="row">
      <DateItem date={days} text="Day" />
      <StyledDivider />
      <DateItem date={hours} text="Hour" />
      <StyledDivider />
      <DateItem date={minutes} text="Minute" />
      <StyledDivider />
      <DateItem date={seconds} text="Second" />

    </Stack>

  );
};

export default Timer;
