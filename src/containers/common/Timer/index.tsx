import { useTimer } from 'react-timer-hook';
import { addZeroToOneDigit } from '@utils/helpers';

import StyledTypography from '../StyledTypography';

interface IMyTimer {
  onExpire: () => void;
 }

const Timer = ({ onExpire }: IMyTimer) => {
  const expiryTimestamp = new Date();

  // TODO: if it needs in future, make it reusable
  expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + 59); // 59 seconds timer

  const {
    seconds,
    minutes,
  } = useTimer({ expiryTimestamp, onExpire });

  return (
    <StyledTypography color="grey">
      {`${addZeroToOneDigit(minutes)}:${addZeroToOneDigit(seconds)}`}
    </StyledTypography>
  );
};

export default Timer;
