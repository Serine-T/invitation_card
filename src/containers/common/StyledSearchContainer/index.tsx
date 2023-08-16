import { ReactNode } from 'react';

import { StyledSearchContainer } from './styled';

interface IStyledSearchSection {
    children: ReactNode;
}

const StyledSearchSection = ({ children }: IStyledSearchSection) => {
  return (
    <StyledSearchContainer>
      { children}
    </StyledSearchContainer>
  );
};

export default StyledSearchSection;
