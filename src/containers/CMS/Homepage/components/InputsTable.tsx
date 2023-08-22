import { memo } from 'react';

import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import TableCell from '@mui/material/TableCell';
import StyledTable from '@containers/common/Table';
import { StyledTableRow } from '@containers/common/Table/styled';
import { StyledButton, StyledStack, StyledTableCell } from '@containers/common/StyledAddEditTables/styled';
import TitlesWithBackButton from '@containers/common/TitlesWithBackButton';
import PAGE_ROUTES from '@routes/routingEnum';
import ReusableFields from '@containers/common/ReusableFields';

import {
  AddBannerSchema,
  IAddBannerForm,
  inputsRows,
  defaultValues,
} from './helpers';

interface IInputsTable {
  hompageData?: any;
}

const InputsTable = ({ hompageData }: IInputsTable) => {
  const methods = useForm<IAddBannerForm>({
    resolver: yupResolver(AddBannerSchema),
    defaultValues,
  });

  const {
    handleSubmit,
  } = methods;
  // TODO: add logic, remove consoles

  const onSubmit = (data: IAddBannerForm) => {
    console.log('data', data);
  };

  return (
    <TitlesWithBackButton title={hompageData ? 'Edit Banner' : 'Add Banner'} path={PAGE_ROUTES.HOMEPAGE}>
      <FormProvider {...methods}>
        <StyledStack
          onSubmit={handleSubmit(onSubmit)}
          component="form"
        >
          <StyledTable tableTitle="BANNER" colSpan={2}>
            {inputsRows.map((item) => {
              const { label } = item;

              return (
                <StyledTableRow key={label}>
                  <StyledTableCell>{`${label}:`}</StyledTableCell>
                  <TableCell>
                    <ReusableFields {...item} />
                  </TableCell>
                </StyledTableRow>
              );
            })}
          </StyledTable>
          <StyledButton type="submit">Submit</StyledButton>
        </StyledStack>
      </FormProvider>
    </TitlesWithBackButton>
  );
};

export default memo(InputsTable);
