import { memo } from 'react';

import { StyledButton } from '@containers/common/StyledAddEditTables/styled';

interface ISubmitBtn {
  actionLoading: boolean;
}

const SubmitBtn = ({ actionLoading }: ISubmitBtn) => (
  <StyledButton
    type="submit"
    disabled={actionLoading}
    isLoading={actionLoading}
  >
    Submit
  </StyledButton>
);

export default memo(SubmitBtn);
