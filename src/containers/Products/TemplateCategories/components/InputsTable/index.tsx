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
import { ITemplateCategory } from '@features/templateCategories/types';
import { selectTemplateCategories } from '@features/templateCategories/selectors';
import { addTemplateCategory, editTemplateCategory } from '@features/templateCategories/actions';
import SubmitBtn from '@containers/common/Table/components/SubmitBtn';
import RowComponent from '@containers/common/Table/components/RowComponent';

import {
  AddDataSchema,
  IAddDataForm,
  inputsRows,
  defaultValues,
} from './helpers';

interface IInputsTable{
  templateCategoriesData?: ITemplateCategory;
}

const InputsTable = ({ templateCategoriesData }: IInputsTable) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { actionLoading } = useAppSelector(selectTemplateCategories);
  const methods = useForm<IAddDataForm>({
    resolver: yupResolver(AddDataSchema),
    defaultValues: templateCategoriesData ?? defaultValues,
  });

  const {
    handleSubmit,
    setError,
  } = methods;

  const onSubmit = (data: IAddDataForm) => {
    dispatch(templateCategoriesData ? editTemplateCategory(data) : addTemplateCategory(data)).unwrap().then(() => {
      navigate(PAGE_ROUTES.TEMPLATE_CATEGORIES);
    }).catch((e) => {
      if (e.message === 'Template category with the provided name already exists!') {
        setError('name', { message: e.message });
      } else {
        navigate(PAGE_ROUTES.TEMPLATE_CATEGORIES);
      }
    });
  };

  return (
    <TitlesWithBackButton
      title={templateCategoriesData ? 'Edit Template Category' : 'Add Template Category'}
      path="TEMPLATE_CATEGORIES"
    >
      <FormProvider {...methods}>
        <StyledStack
          onSubmit={handleSubmit(onSubmit)}
          component="form"
        >
          <StyledTable tableTitle="TEMPLATE CATEGORY" colSpan={2}>
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
