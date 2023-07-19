import { memo } from 'react';

import {
  ErrorMessage as HFErrorMessage,
  Props as HFProps,
} from '@hookform/error-message';

import { StyledErrorText } from './styled';

interface IErrorMessage extends HFProps<any, any> {}

const ErrorMessage = ({ ...restProps }: IErrorMessage) => {
  const { errors, render } = restProps;

  const customeRender = ({ message }: { message: string }) => (
    <StyledErrorText>
      {message}
    </StyledErrorText>
  );

  return (
    <HFErrorMessage
      errors={errors}
      render={render || customeRender}
      {...restProps}
    />
  );
};

export default memo(ErrorMessage);
