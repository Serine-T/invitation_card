import { memo } from 'react';

import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { PAGE_ROUTES } from '@routes/routingEnum';

import { StyledButton, StyledContainer } from './styled';

const NotFound = () => {
  const navigate = useNavigate();
  const handleRedirectHome = () => {
    navigate(PAGE_ROUTES.HOME);
  };

  return (
    <StyledContainer>
      <Typography variant="h2">
        404
      </Typography>
      <Typography variant="h2" mb="16px">
        Page not found
      </Typography>
      <Typography variant="h9" mb="30px">
        The page you are looking for does not exist. Please go back to Home Page to proceed.
      </Typography>
      <StyledButton onClick={handleRedirectHome}>
        Home page
      </StyledButton>
    </StyledContainer>
  );
};

export default memo(NotFound);
