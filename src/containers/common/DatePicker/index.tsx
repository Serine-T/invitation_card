import { memo, useRef } from 'react';

import Input from '@containers/common/Input';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CalendarIcon from '@containers/common/Icons/CalendarIcon';
import { useFormContext } from 'react-hook-form';

import { StyledBox, StyledCalendarIcon } from './styled';

interface IStyledDatePicker {
  width?: string;
  name: string;
}

const StyledDatePicker = ({ width = '100%', name }: IStyledDatePicker) => {
  const { watch, setValue } = useFormContext();
  const datePickerRef = useRef<any>(null);
  const handleIconClick = () => {
    datePickerRef.current!.setFocus();
  };

  return (
    <StyledBox>
      <DatePicker
        ref={datePickerRef}
        selected={watch(name)}
        onChange={(date: Date) => setValue(name, date)}
        customInput={<Input width={width} />}
      />
      <StyledCalendarIcon
        onClick={handleIconClick}
      >
        <CalendarIcon />
      </StyledCalendarIcon>
    </StyledBox>
  );
};

export default memo(StyledDatePicker);
