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
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@features/app/hooks';
import { IAttribute } from '@features/attributes/types';
import { selectAttributes } from '@features/attributes/selectors';
import { addAttribute, editAttribute } from '@features/attributes/actions';
import { selectAttributeCategories } from '@features/attributeCategories/selectors';
import { getOptionsArray } from '@utils/helpers';
import Input from '@containers/common/Input';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

import {
  AddDataSchema,
  IAddDataForm,
  inputsRows,
  defaultValues,
  formattedPayload,
} from './helpers';

interface IInputsTable{
  attributesData?: IAttribute;
}

const InputsTable = ({ attributesData }: IInputsTable) => {
  const { data: attributeCategories } = useAppSelector(selectAttributeCategories);

  const categoriesList = getOptionsArray(attributeCategories, 'name');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { actionLoading } = useAppSelector(selectAttributes);
  const methods = useForm<IAddDataForm>({
    resolver: yupResolver(AddDataSchema),
    defaultValues: attributesData ?? defaultValues,
  });

  const {
    handleSubmit,
    setError,
    register,
    formState: { errors },
  } = methods;

  const onSubmit = (data: IAddDataForm) => {
    const payload = formattedPayload(data);

    dispatch(attributesData ? editAttribute(payload) : addAttribute(payload)).unwrap().then(() => {
      navigate(PAGE_ROUTES.ATTRIBUTES);
    }).catch((e) => {
      if (e.message === 'Attribute with the provided name already exists in this attribute category!') {
        setError('name', { message: e.message });
      } else if (e.message === 'Attribute with the provided nickname already exists in this attribute category!') {
        setError('nickname', { message: e.message });
      } else {
        navigate(PAGE_ROUTES.ATTRIBUTES);
      }
    });
  };

  return (
    <TitlesWithBackButton
      title={attributesData ? 'Edit Attribute' : 'Add Attribute'}
      path={PAGE_ROUTES.ATTRIBUTES}
    >
      <FormProvider {...methods}>
        <StyledStack
          onSubmit={handleSubmit(onSubmit)}
          component="form"
        >
          <StyledTable tableTitle="ATTRIBUTE" colSpan={2}>
            {inputsRows.map((item) => {
              const { label } = item;

              return (
                <StyledTableRow key={label}>
                  <StyledTableCell>{`${label}:`}</StyledTableCell>
                  <TableCell>
                    <ReusableFields
                      {...item}
                      selectList={[{
                        field: 'attributeCategory',
                        options: categoriesList,
                      }]}
                    />
                  </TableCell>
                </StyledTableRow>
              );
            })}
            <StyledTableRow>
              <StyledTableCell>Default Price:</StyledTableCell>
              <TableCell>
                <Stack direction="row" alignItems="center" gap="8px">
                  <Typography>$</Typography>
                  <Input
                    width="80px"
                    type="text"
                    placeholder="00.00"
                    {...register('defaultPrice')}
                    errorMessage={errors?.defaultPrice?.message as string}
                  />
                </Stack>

              </TableCell>
            </StyledTableRow>
            <StyledTableRow>
              <StyledTableCell>4over Code:</StyledTableCell>
              <TableCell>
                <Input
                  type="text"
                  placeholder="4over Code"
                  {...register('fouroverCode')}
                  errorMessage={errors?.fouroverCode?.message as string}
                />
              </TableCell>
            </StyledTableRow>

          </StyledTable>
          <StyledButton
            type="submit"
            disabled={actionLoading}
            isLoading={actionLoading}
          >
            Submit
          </StyledButton>
        </StyledStack>
      </FormProvider>
    </TitlesWithBackButton>
  );
};

export default memo(InputsTable);
