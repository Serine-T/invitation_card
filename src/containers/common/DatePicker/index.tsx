import { memo, useRef } from 'react';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CalendarIcon from '@containers/common/Icons/CalendarIcon';
import { useFormContext } from 'react-hook-form';
import { InputBaseProps } from '@mui/material';

import { StyledBox, StyledCalendarIcon } from './styled';
import Input from '../Input';

interface IStyledDatePicker extends InputBaseProps{
  name: string;
  width: string;
  errorMessage: string;
}

const StyledDatePicker = ({ name, width, inputProps, errorMessage }: IStyledDatePicker) => {
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
        customInput={<Input width={width} inputProps={inputProps} errorMessage={errorMessage} />}
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
