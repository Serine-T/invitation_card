import { ReactNode, memo } from 'react';

import postcardsLogo from '@assets/images/postcards-logo.png';

import { StyledBox, StyledLogoBox, StyledContainer, StyledSection } from './styled';

interface AuthComponentProps {
  children: ReactNode;
}

const AuthComponent = ({ children }: AuthComponentProps) => (
  <StyledSection>
    <StyledContainer>
      <StyledLogoBox>
        <img src={postcardsLogo} alt="postcards Logo" />
      </StyledLogoBox>
      <StyledBox>
        {children}
      </StyledBox>
    </StyledContainer>
  </StyledSection>
);

export default memo(AuthComponent);
