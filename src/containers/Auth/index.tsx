import { ReactNode, memo } from 'react';

import postcardsLogo from '@assets/images/postcards-logo.png';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '@features/app/hooks';
import { selectIsAuth } from '@features/auth/selectors';
import { PAGE_ROUTES } from '@routes/routingEnum';
import useMount from '@customHooks/useMount';

import { StyledBox, StyledLogoBox, StyledContainer, StyledSection } from './styled';

interface AuthComponentProps {
  children: ReactNode;
}

const AuthComponent = ({ children }: AuthComponentProps) => {
  const navigate = useNavigate();
  const { isAuth } = useAppSelector(selectIsAuth);

  useMount(() => {
    if (isAuth) {
      navigate(PAGE_ROUTES.DASHBOARD);
    }
  });

  if (isAuth) {
    return;
  }

  return (
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
};

export default memo(AuthComponent);
