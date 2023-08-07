import { memo } from 'react';

import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import TableCell from '@mui/material/TableCell';
import StyledTable from '@containers/common/Table';
import { StyledTableRow } from '@containers/common/Table/styled';
import Input from '@containers/common/Input';
import Checkbox from '@containers/common/Checkbox';
import { StyledButton, StyledStack, StyledTableCell } from '@containers/common/AddEditTablesStyles/styled';
import StyledBaseInput from '@containers/common/Textarea';
import ImageUpload from '@containers/common/FileUploader';

import {
  AddBannerSchema,
  IAddBannerForm,
  inputsRows,
  defaultValues,
} from './helpers';

const InputsTable = () => {
  const methods = useForm<IAddBannerForm>({
    resolver: yupResolver(AddBannerSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = methods;

  // TODO: add logic, remove consoles

  console.log('errors', errors, watch());

  const onSubmit = (data: IAddBannerForm) => {
    console.log('data', data);
  };

  return (
    <>
      <FormProvider {...methods}>
        <StyledStack
          onSubmit={handleSubmit(onSubmit)}
          component="form"
        >

          <StyledTable tableTitle="BANNER" colSpan={2}>
            <StyledTableRow>
              <StyledTableCell>Photo (Desktop):</StyledTableCell>
              <TableCell>
                <ImageUpload name="image" errorMessage={errors?.image?.message} />
              </TableCell>
            </StyledTableRow>
            {inputsRows.map(({ label, field }) => (
              <StyledTableRow key={label}>
                <StyledTableCell>{`${label}:`}</StyledTableCell>
                <TableCell>
                  <Input placeholder={label} {...register(field)} errorMessage={errors?.[field]?.message} />
                </TableCell>
              </StyledTableRow>
            ))}

            {/* TODO: check if this field should be textarea */}
            <StyledTableRow>
              <StyledTableCell>Description</StyledTableCell>
              <TableCell>
                <StyledBaseInput
                  errorMessage={errors?.description?.message}
                  placeholder="Description"
                  {...register('description')}
                />
              </TableCell>
            </StyledTableRow>
            {/* TODO: HOMEPAGE change checkbox name */}
            <StyledTableRow>
              <StyledTableCell>Display on Site</StyledTableCell>
              <TableCell>
                <Checkbox name="visibility" />
              </TableCell>
            </StyledTableRow>

          </StyledTable>
          <StyledButton type="submit">Submit</StyledButton>
        </StyledStack>
      </FormProvider>
    </>
  );
};

export default memo(InputsTable);
