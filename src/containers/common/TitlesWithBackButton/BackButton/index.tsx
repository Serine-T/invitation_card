import { memo } from 'react';

import { Link } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Typography from '@mui/material/Typography';
import PAGE_ROUTES from '@routes/routingEnum';

import { StyledBackBox } from './styled';

interface IBackButton {
  path: keyof typeof PAGE_ROUTES;
 }

const BackButton = ({ path }: IBackButton) => {
  return (
    <Link to={PAGE_ROUTES[path]}>
      <StyledBackBox>
        <ArrowBackIosIcon />
        <Typography variant="body3">
          Back
        </Typography>
      </StyledBackBox>
    </Link>
  );
};

export default memo(BackButton);
