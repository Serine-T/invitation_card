import { ReactNode, memo } from 'react';

import BackButton from '@containers/common/BackButton';
import PAGE_ROUTES from '@routes/routingEnum';
import Typography from '@mui/material/Typography';

import { ContentBox, StyledBox, StyledContainer } from './styles';

interface ITitlesWithBackButton {
  title: string;
  children: ReactNode;
  path: PAGE_ROUTES;
}

const TitlesWithBackButton = ({ title, children, path }:ITitlesWithBackButton) => {
  return (
    <StyledContainer>
      <StyledBox>
        <BackButton path={path} />
      </StyledBox>
      <ContentBox>
        <Typography variant="h2" mb="40px">{title}</Typography>
        {children}
      </ContentBox>
    </StyledContainer>
  );
};

export default memo(TitlesWithBackButton);
