import { memo } from 'react';

import Typography from '@mui/material/Typography';

import { StyledTitleBox } from './styled';
import Button from '../Button';

interface IStyledPageTitle {
    title: string;
    btnName: string;
  handleAdd: () => void;
  isShowBtn?: boolean;
}

const PageTitle = ({ title, btnName, handleAdd, isShowBtn = true }: IStyledPageTitle) => {
  return (
    <StyledTitleBox>
      <Typography variant="h2">{title}</Typography>
      { isShowBtn && <Button width="auto" onClick={handleAdd}>{ btnName}</Button>}
    </StyledTitleBox>
  );
};

export default memo(PageTitle);
