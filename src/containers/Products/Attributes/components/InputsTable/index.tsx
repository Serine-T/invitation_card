import { memo } from 'react';

import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import StyledTable from '@containers/common/Table';
import { StyledStack } from '@containers/common/StyledAddEditTables/styled';
import TitlesWithBackButton from '@containers/common/TitlesWithBackButton';
import PAGE_ROUTES from '@routes/routingEnum';
import ReusableFields from '@containers/common/ReusableFields';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@features/app/hooks';
import { IAddAttributePayload } from '@features/attributes/types';
import { selectAttributes } from '@features/attributes/selectors';
import { addAttribute, editAttribute } from '@features/attributes/actions';
import { selectAttributeCategories } from '@features/attributeCategories/selectors';
import { getOptionsArray } from '@utils/helpers';
import Input from '@containers/common/Input';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import SubmitBtn from '@containers/common/Table/components/SubmitBtn';
import RowComponent from '@containers/common/Table/components/RowComponent';

import {
  AddDataSchema,
  IAddDataForm,
  inputsRows,
  defaultValues,
  formattedPayload,
} from './helpers';

interface IInputsTable{
  attributesData?: IAddAttributePayload;
}

const InputsTable = ({ attributesData }: IInputsTable) => {
  const { data: attributeCategories } = useAppSelector(selectAttributeCategories);

  const categoriesList = getOptionsArray(attributeCategories, 'name');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { actionLoading } = useAppSelector(selectAttributes);
  const methods = useForm<IAddDataForm>({
    resolver: yupResolver(AddDataSchema) as any, // TODO: change any
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
      path="ATTRIBUTES"
    >
      <FormProvider {...methods}>
        <StyledStack
          onSubmit={handleSubmit(onSubmit)}
          component="form"
        >
          <StyledTable tableTitle="ATTRIBUTE" colSpan={2}>
            {inputsRows.map((item) => (
              <RowComponent key={item.label} {...item}>
                <ReusableFields
                  {...item}
                  selectList={[{
                    field: 'attributeCategory',
                    options: categoriesList,
                  }]}
                />
              </RowComponent>
            ))}
            <RowComponent label="Default Price">
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
            </RowComponent>
            <RowComponent label="4over Code">
              <Input
                type="text"
                placeholder="4over Code"
                {...register('fouroverCode')}
                errorMessage={errors?.fouroverCode?.message as string}
              />
            </RowComponent>
          </StyledTable>
          <SubmitBtn actionLoading={actionLoading} />
        </StyledStack>
      </FormProvider>
    </TitlesWithBackButton>
  );
};

export default memo(InputsTable);
