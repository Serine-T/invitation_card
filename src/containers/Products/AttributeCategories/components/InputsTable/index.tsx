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
import { IAttributeCategory } from '@features/attributeCategories/types';
import { selectAttributeCategories } from '@features/attributeCategories/selectors';
import { addAttributeCategory, editAttributeCategory } from '@features/attributeCategories/actions';
import SubmitBtn from '@containers/common/Table/components/SubmitBtn';
import RowComponent from '@containers/common/Table/components/RowComponent';

import {
  AddDataSchema,
  IAddDataForm,
  inputsRows,
  defaultValues,
} from './helpers';

interface IInputsTable{
  attributeCategoriesData?: IAttributeCategory;
}

const InputsTable = ({ attributeCategoriesData }: IInputsTable) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { actionLoading } = useAppSelector(selectAttributeCategories);
  const methods = useForm<IAddDataForm>({
    resolver: yupResolver(AddDataSchema),
    defaultValues: attributeCategoriesData ?? defaultValues,
  });

  const {
    handleSubmit,
    setError,
  } = methods;

  const onSubmit = (data: IAddDataForm) => {
    dispatch(attributeCategoriesData ? editAttributeCategory(data) : addAttributeCategory(data)).unwrap().then(() => {
      navigate(PAGE_ROUTES.ATTRIBUTE_CATEGORIES);
    }).catch((e) => {
      if (e.message === 'Attribute category with provided name already exists!') {
        setError('name', { message: e.message });
      } else {
        navigate(PAGE_ROUTES.ATTRIBUTE_CATEGORIES);
      }
    });
  };

  return (
    <TitlesWithBackButton
      title={attributeCategoriesData ? 'Edit Attribute Category' : 'Add Attribute Category'}
      path="ATTRIBUTE_CATEGORIES"
    >
      <FormProvider {...methods}>
        <StyledStack
          onSubmit={handleSubmit(onSubmit)}
          component="form"
        >
          <StyledTable tableTitle="ATTRIBUTE CATEGORY" colSpan={2}>
            {inputsRows.map((item) => (
              <RowComponent key={item.label} {...item}>
                <ReusableFields {...item} />
              </RowComponent>
            ))}
          </StyledTable>
          <SubmitBtn actionLoading={actionLoading} />
        </StyledStack>
      </FormProvider>
    </TitlesWithBackButton>
  );
};

export default memo(InputsTable);
