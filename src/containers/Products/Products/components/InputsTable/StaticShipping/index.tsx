import { memo } from 'react';

import { useFormContext } from 'react-hook-form';
import TableCell from '@mui/material/TableCell';
import { StyledTableRow } from '@containers/common/Table/styled';
import { StyledTableCell } from '@containers/common/StyledAddEditTables/styled';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';

import { staticShippingFacilityFields } from './helpers';
import { StyledBox } from './styled';

const StaticShipping = () => {
  const { watch, setValue } = useFormContext();
  const checkboxes = watch('staticShippingFacility');

  const handleAllChange = () => {
    const allCheckboxState = watch('staticShippingFacilityAll');

    setValue('staticShippingFacilityAll', !allCheckboxState);
    staticShippingFacilityFields.forEach(({ field }) => {
      setValue(`staticShippingFacility[${field}]`, !allCheckboxState);
    });
  };

  const handleSingleCheckboxChange = (field: string) => {
    const updatedCheckboxes = { ...checkboxes, [field]: !checkboxes[field] };

    setValue('staticShippingFacility', updatedCheckboxes);
    setValue('staticShippingFacilityAll', Object.values(updatedCheckboxes).every((value) => value === true));
  };

  return (
    <StyledTableRow>
      <StyledTableCell>Static Shipping Facility:</StyledTableCell>
      <TableCell>
        <StyledBox>
          <FormControlLabel
            control={(
              <Checkbox
                disableRipple
                checked={watch('staticShippingFacilityAll')}
                onChange={handleAllChange}
              />
)}
            label={<Typography variant="body3">All Facilities</Typography>}
          />
          {staticShippingFacilityFields.map(({ label, field }) => {
            return (
              <FormControlLabel
                key={field}
                control={(
                  <Checkbox
                    disableRipple
                    checked={watch(`staticShippingFacility[${field}]`)}
                    onChange={() => handleSingleCheckboxChange(field)}
                  />
)}
                label={<Typography variant="body3">{label}</Typography>}
              />
            );
          })}
        </StyledBox>
      </TableCell>
    </StyledTableRow>
  );
};

export default memo(StaticShipping);
