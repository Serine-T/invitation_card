import { memo } from 'react';

import StyledTypography from '@containers/common/StyledTypography';

interface IAddTextBtn {
  text: string;
  handleAdd: () => void;
}

const AddTextBtn = ({ text, handleAdd }: IAddTextBtn) => (
  <StyledTypography
    variant="body3"
    color="blue"
    cursor="pointer"
    onClick={handleAdd}
  >
    {text}
  </StyledTypography>
);

export default memo(AddTextBtn);
