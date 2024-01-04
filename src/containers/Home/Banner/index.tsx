import { memo } from 'react';

import canva from '@assets/images/canva.png';

import { StyledContainer, StyledImage } from './styled';

const Banner = () => {
  return (
    <StyledContainer>
      <StyledImage src={canva} alt="" />
    </StyledContainer>
  );
};

export default memo(Banner);
