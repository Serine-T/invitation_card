import { ReactNode, memo } from 'react';

import BackButton from '@containers/common/BackButton';
import PAGE_ROUTES from '@routes/routingEnum';
import Typography from '@mui/material/Typography';

import { ContentBox, StyledBox, StyledContainer } from './styles';

interface ITitlesWithBackButton {
  title: string;
  children: ReactNode;
}

const TitlesWithBackButton = ({ title, children }:ITitlesWithBackButton) => {
  return (
    <StyledContainer>
      <StyledBox>
        <BackButton path={PAGE_ROUTES.USERS} />
      </StyledBox>
      <ContentBox>
        <Typography variant="h2">{title}</Typography>
        {children}
      </ContentBox>
    </StyledContainer>

  );
};

export default memo(TitlesWithBackButton);
