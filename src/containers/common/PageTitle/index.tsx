import { memo } from 'react';

import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import PAGE_ROUTES from '@routes/routingEnum';

import { StyledTitleBox } from './styled';
import Button from '../Button';

interface IStyledPageTitle {
  title: string;
  btnName: string;
  path: PAGE_ROUTES;
  isShowBtn?: boolean;
}

const PageTitle = ({ title, btnName, path, isShowBtn = true }: IStyledPageTitle) => {
  const navigate = useNavigate();
  const handleAdd = () => navigate(path);

  return (
    <StyledTitleBox>
      <Typography variant="h2">{title}</Typography>
      { isShowBtn && <Button width="auto" onClick={handleAdd}>{ btnName}</Button>}
    </StyledTitleBox>
  );
};

export default memo(PageTitle);
