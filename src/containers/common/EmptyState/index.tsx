import { memo } from 'react';

import { StyledTitleBox } from './styled';
import StyledTypography from '../StyledTypography';

interface IEmptyState {
  text: string;
}

const EmptyState = ({ text }: IEmptyState) => (
  <StyledTitleBox>
    <StyledTypography variant="h6" color="grey">
      {text}
    </StyledTypography>
  </StyledTitleBox>
);

export default memo(EmptyState);
