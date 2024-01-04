import { addZero } from '@utils/helpers';
import Stack from '@mui/material/Stack';

import { StyledText } from './styled';

interface IDateItem {
  date: number;
  text: string;
}

const DateItem = ({ date, text } : IDateItem) => {
  return (
    <Stack alignItems="center" mx="15px">
      <StyledText variant="h2" isItalic>
        {addZero(date)}
      </StyledText>
      <StyledText variant="h6" isItalic>
        {text}
        {date !== 0 ? 's' : ''}
      </StyledText>
    </Stack>
  );
};

export default DateItem;
