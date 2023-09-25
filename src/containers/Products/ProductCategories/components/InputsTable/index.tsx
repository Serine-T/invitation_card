import { memo } from 'react';

import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import StyledTable from '@containers/common/Table';
import { StyledStack } from '@containers/common/StyledAddEditTables/styled';
import TitlesWithBackButton from '@containers/common/TitlesWithBackButton';
import PAGE_ROUTES from '@routes/routingEnum';
import ReusableFields from '@containers/common/Table/components/ReusableFields';
import { useAppDispatch, useAppSelector } from '@features/app/hooks';
import { selectCategories } from '@features/categories/selectors';
import { getOptionsArray } from '@utils/helpers';
import { addSubcategory, editSubcategory } from '@features/subcategories/actions';
import { useNavigate } from 'react-router-dom';
import { selectSubcategories } from '@features/subcategories/selectors';
import { ISubcategoriesInfo } from '@features/subcategories/types';
import SubmitBtn from '@containers/common/Table/components/SubmitBtn';
import RowComponent from '@containers/common/Table/components/RowComponent';

import {
  AddSubcategorySchema,
  IAddSubcategoryForm,
  defaultInkInEstimatorValues,
  defaultValues,
  formattedData,
  formattingPayload,
  inputsRows1,
  inputsRows2,
  printTypeValues,
} from './helpers';
import StaticShipping from './StaticShipping';
import SEO from './SEO';

interface IInputsTable{
  subcategoriesData?: ISubcategoriesInfo;
}

const InputsTable = ({ subcategoriesData }: IInputsTable) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { data: categories } = useAppSelector(selectCategories);
  const { actionLoading } = useAppSelector(selectSubcategories);
  const categoriesList = getOptionsArray(categories);

  const methods = useForm<IAddSubcategoryForm>({
    resolver: yupResolver(AddSubcategorySchema as any), // TODO: add typing
    defaultValues: subcategoriesData ? formattedData(subcategoriesData) : defaultValues,
  });

  const {
    handleSubmit,
    setError,
  } = methods;

  const onSubmit = (data: IAddSubcategoryForm) => {
    const payload = formattingPayload(data);

    dispatch(subcategoriesData ? editSubcategory(payload) : addSubcategory(payload)).unwrap().then(() => {
      navigate(PAGE_ROUTES.PRODUCT_CATEGORIES);
    }).catch((e) => {
      if (e.message === 'Subcategory with the provided title already exists in this category!') {
        setError('title', { message: e.message });
      // eslint-disable-next-line max-len
      } else if (e.message === 'You have already chose the banners in the category, please disable one of them to proceed.') {
        setError('displayAsCardInHeader', { message: e.message });
      } else {
        navigate(PAGE_ROUTES.PRODUCT_CATEGORIES);
      }
    });
  };

  return (
    <TitlesWithBackButton
      title={subcategoriesData ? 'Edit Subcategory' : 'Add Subcategory'}
      path="PRODUCT_CATEGORIES"
    >
      <FormProvider {...methods}>
        <StyledStack
          onSubmit={handleSubmit(onSubmit)}
          component="form"
        >
          <StyledTable tableTitle="SUBCATEGORY" colSpan={2}>

            {inputsRows1.map((item) => (
              <RowComponent key={item.label} {...item}>
                <ReusableFields
                  {...item}
                  selectList={[{
                    field: 'categoryId',
                    options: categoriesList,
                  }, {
                    field: 'printType',
                    options: printTypeValues,
                  }, {
                    field: 'defaultInkInEstimator',
                    options: defaultInkInEstimatorValues,
                  }]}
                />
              </RowComponent>
            ))}
            <StaticShipping />

            {inputsRows2.map((item) => (
              <RowComponent key={item.label} {...item}>
                <ReusableFields {...item} />
              </RowComponent>
            ))}
          </StyledTable>
          <SEO />
          <SubmitBtn actionLoading={actionLoading} />
        </StyledStack>
      </FormProvider>
    </TitlesWithBackButton>
  );
};

export default memo(InputsTable);
