import { memo } from 'react';

import Stack from '@mui/material/Stack';
import Button from '@containers/common/Button';
import { useNavigate } from 'react-router-dom';
import StyledTypography from '@containers/common/StyledTypography';

interface IEmptyState {
  path: string;
}

const SearchBtn = ({ path }: IEmptyState) => {
  const navigate = useNavigate();
  const handleReset = () => {
    navigate(path);
  };

  return (
    <Stack direction="row" gap="16px" alignItems="center">
      <Button width="120px" type="submit">Search</Button>
      <StyledTypography
        onClick={handleReset}
        color="grey"
        variant="body3"
      >
        Reset Filters
      </StyledTypography>
    </Stack>
  );
};

export default memo(SearchBtn);
