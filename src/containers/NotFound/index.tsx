import { memo } from 'react';

import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import PAGE_ROUTES from '@routes/routingEnum';

import { StyledButton, StyledContainer } from './styled';

const NotFound = () => {
  const navigate = useNavigate();
  const handleRedirectHome = () => {
    navigate(PAGE_ROUTES.HOME);
  };

  return (
    <StyledContainer>
      <Typography variant="h2" mb="16px">
        Page not found
      </Typography>
      <StyledButton onClick={handleRedirectHome}>
        Home page
      </StyledButton>
    </StyledContainer>
  );
};

export default memo(NotFound);
