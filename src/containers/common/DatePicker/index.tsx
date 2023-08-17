import { memo, useRef } from 'react';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CalendarIcon from '@containers/common/Icons/CalendarIcon';
import { useFormContext } from 'react-hook-form';
// import { InputBaseProps } from '@mui/material';

import { StyledBox, StyledCalendarIcon } from './styled';
import Input, { IBaseInputProps } from '../Input';

interface IStyledDatePicker extends IBaseInputProps{
  name: string;
}

const StyledDatePicker = (props: IStyledDatePicker) => {
  const { name } = props;
  const { watch, setValue, register } = useFormContext();
  const datePickerRef = useRef<any>(null);
  const handleIconClick = () => {
    datePickerRef.current!.setFocus();
  };

  console.log(watch());

  return (
    <StyledBox>
      <DatePicker
        ref={datePickerRef}
        selected={watch(name)}
        onChange={(date: Date) => setValue(name, date)}
        customInput={<Input {...register(name)} {...props} />}
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
