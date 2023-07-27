import { Link } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Typography from '@mui/material/Typography';

import { StyledBackBox } from './styled';

interface IBackButton {
  path: string;
 }

const BackButton = ({ path }: IBackButton) => {
  return (
    <Link to={path}>
      <StyledBackBox>
        <ArrowBackIosIcon />
        <Typography variant="body3">
          Back
        </Typography>

      </StyledBackBox>
    </Link>
  );
};

export default BackButton;
