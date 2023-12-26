import { addZero } from '@utils/helpers';
import Stack from '@mui/material/Stack';
import StyledTypography from '@containers/common/StyledTypography';

interface IDateItem {
  date: number;
  text: string;
}

const DateItem = ({ date, text } : IDateItem) => {
  return (
    <Stack alignItems="center" mx="15px">
      <StyledTypography variant="h2" color="primary" isItalic>
        {addZero(date)}
      </StyledTypography>
      <StyledTypography variant="h2" color="primary" isItalic>
        {text}
        {date !== 0 ? 's' : ''}
      </StyledTypography>
    </Stack>
  );
};

export default DateItem;
