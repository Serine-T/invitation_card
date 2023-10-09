import { memo } from 'react';

import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import StyledTable from '@containers/common/Table';
import { StyledStack } from '@containers/common/StyledAddEditTables/styled';
import TitlesWithBackButton from '@containers/common/TitlesWithBackButton';
import PAGE_ROUTES from '@routes/routingEnum';
import ReusableFields from '@containers/common/Table/components/ReusableFields';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@features/app/hooks';
import { addCategory, editCategory } from '@features/categories/actions';
import { ICategories } from '@features/categories/types';
import { selectCategories } from '@features/categories/selectors';
import SubmitBtn from '@containers/common/Table/components/SubmitBtn';
import RowComponent from '@containers/common/Table/components/RowComponent';

import {
  AddDataSchema,
  IAddDataForm,
  inputsRows,
  defaultValues,
} from './helpers';

interface IInputsTable{
  categoriesData?: ICategories;
}

const InputsTable = ({ categoriesData }: IInputsTable) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { actionLoading } = useAppSelector(selectCategories);
  const methods = useForm<IAddDataForm>({
    resolver: yupResolver(AddDataSchema),
    defaultValues: categoriesData ?? defaultValues,
  });

  const { handleSubmit, setError } = methods;

  const onSubmit = (data: IAddDataForm) => {
    dispatch(categoriesData ? editCategory(data) : addCategory(data)).unwrap().then(() => {
      navigate(PAGE_ROUTES.MENU_CATEGORIES);
    }).catch((e) => {
      if (e.message === 'Category with the provided title already exists!') {
        setError('title', { message: e.message });
      // eslint-disable-next-line max-len
      } else if (e.message === 'You have selected the maximum number of categories for the header. Please deselect one before adding another!') {
        setError('displayInHeader', { message: e.message });
      } else {
        navigate(PAGE_ROUTES.MENU_CATEGORIES);
      }
    });
  };

  return (
    <TitlesWithBackButton title={categoriesData ? 'Edit Category' : 'Add Category'} path="MENU_CATEGORIES">
      <FormProvider {...methods}>
        <StyledStack
          onSubmit={handleSubmit(onSubmit)}
          component="form"
        >
          <StyledTable tableTitle="CATEGORY" colSpan={2}>
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
