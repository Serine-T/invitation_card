import { memo } from 'react';

import StyledTypography from '@containers/common/StyledTypography';
import { useNavigate } from 'react-router-dom';

interface IRowTitle {
  title: string;
  path: string;
}

const RowTitle = ({ title, path }: IRowTitle) => {
  const navigate = useNavigate();
  const handleEdit = () => navigate(path);

  return (
    <StyledTypography
      color="blue"
      underLine
      onClick={handleEdit}
      variant="body3"
      cursor="pointer"
    >
      {title}
    </StyledTypography>
  );
};

export default memo(RowTitle);
