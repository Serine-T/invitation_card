import { memo, useCallback, useState } from 'react';

import Timer from '@containers/common/Timer';
import Typography from '@mui/material/Typography';
import StyledTypography from '@containers/common/StyledTypography';

import AuthComponent from '..';
import { StyledForgetText, StyledInputBox, StyledTitle } from '../styled';
import { StyledTimer } from './styled';

const SuccessPage = () => {
  const [isTime, setIsTime] = useState(false);

  const handleResend = () => {
    setIsTime((prev) => !prev);
  };

  const onExpire = useCallback(() => {
    setIsTime(true);
  }, []);

  return (
    <AuthComponent>
      <StyledTitle variant="h5">
        Success!
      </StyledTitle>

      <StyledInputBox>
        <Typography variant="body2">
          Check your email, we have sent you a link to reset your password
        </Typography>
      </StyledInputBox>

      {isTime ? (
        <StyledForgetText
          display="inline"
          color="blue"
          variant="h10"
          onClick={handleResend}
        >
          Resend
        </StyledForgetText>
      ) : (
        <StyledTimer>
          <StyledTypography mr="3px" color="grey">Resend in</StyledTypography>
          <Timer onExpire={onExpire} />
        </StyledTimer>
      )}

    </AuthComponent>
  );
};

export default memo(SuccessPage);
