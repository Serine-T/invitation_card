import { memo } from 'react';

import canva from '@assets/images/canva.png';

import { StyledContainer } from './styled';

const Banner = () => {
  return (
    <StyledContainer>
      <img
        src={canva}
        alt=""
        style={{
          height: '600px',
          width: '100%',
          position: 'absolute',
          objectFit: 'contain',
          top: 0,
        }}
      />
    </StyledContainer>
  );
};

export default memo(Banner);
