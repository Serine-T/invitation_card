import { memo } from 'react';

import Typography from '@mui/material/Typography';

import { StyledTitleBox } from './styled';
import Button from '../Button';

interface IStyledPageTitle {
    title: string;
    btnName: string;
    handleAdd: () => void;
}

const PageTitle = ({ title, btnName, handleAdd }: IStyledPageTitle) => {
  return (
    <StyledTitleBox>
      <Typography variant="h2">{title}</Typography>
      <Button width="120px" onClick={handleAdd}>{ btnName}</Button>
    </StyledTitleBox>
  );
};

export default memo(PageTitle);
