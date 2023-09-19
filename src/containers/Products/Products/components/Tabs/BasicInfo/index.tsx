import { memo, useEffect, useRef, useState } from 'react';

import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import StyledTable from '@containers/common/Table';
import { StyledStack } from '@containers/common/StyledAddEditTables/styled';
import PAGE_ROUTES from '@routes/routingEnum';
import ReusableFields from '@containers/common/ReusableFields';
import { useAppDispatch, useAppSelector } from '@features/app/hooks';
import { selectCategories } from '@features/categories/selectors';
import { getOptionsArray } from '@utils/helpers';
import { useNavigate } from 'react-router-dom';
import { selectSubcategories } from '@features/subcategories/selectors';
import SubmitBtn from '@containers/common/Table/components/SubmitBtn';
import { addProduct, editProduct } from '@features/products/actions';
import { IProductsPayload } from '@features/products/types';
import { getSubcategoriesByCategoryId } from '@features/subcategories/actions';
import { ISubcategoriesByCategoryId } from '@features/subcategories/types';
import Input from '@containers/common/Input';
import SEO from '@containers/Products/ProductCategories/components/InputsTable/SEO';
import RowComponent from '@containers/common/Table/components/RowComponent';

import {
  AddDataSchema,
  IAddDataForm,
  defaultGrandFormatValues,
  defaultValues,
  formattingPayload,
  inputsRows1,
  inputsRows2,
} from './helpers';
// import SEO from './SEO';
import ProductDescription from './ProductDescription';
import GrandFormatOptions from './GrandFormatOptions';
import GrandFormatDiscounts from './GrandFormatDiscounts';

interface IInputsTable{
  editData?: IProductsPayload;
}

const InputsTable = ({ editData }: IInputsTable) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { data: categories } = useAppSelector(selectCategories);
  const { actionLoading } = useAppSelector(selectSubcategories);
  const filteredList = categories.filter((item) => item.subCategory.length);

  const categoriesList = getOptionsArray(filteredList);

  const [subcategoriesList, setSubcategoriesList] = useState<ISubcategoriesByCategoryId[]>([]);
  const methods = useForm<IAddDataForm>({
    resolver: yupResolver(AddDataSchema as any), // TODO: add typing
    defaultValues: editData || defaultValues,
  });

  const {
    handleSubmit,
    setValue,
    watch,
    register,
    formState: { errors },
  } = methods;

  const { categoryId, subCategoryId, isGrandFormat } = watch();
  const mountedRef = useRef(false);

  useEffect(() => {
    if (!categoryId) {
      setSubcategoriesList([]);
      setValue('subCategoryId', '');

      return;
    }

    dispatch(getSubcategoriesByCategoryId(categoryId))
      .unwrap()
      .then((data) => {
        setSubcategoriesList(data);

        if (!mountedRef.current) {
          mountedRef.current = true;
        } else {
          setValue('subCategoryId', '');
        }
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId]);

  useEffect(() => {
    if (!mountedRef.current) {
      return;
    }

    const currentSubcategory = subcategoriesList.find((item) => item.id === subCategoryId);

    setValue('isGrandFormat', !!currentSubcategory?.useGrandFormatSQFtTemplate);

    setValue(
      'grandFormatOptions',
      !currentSubcategory?.useGrandFormatSQFtTemplate ? null
        : defaultGrandFormatValues,
    );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subCategoryId]);

  const onSubmit = (data: IAddDataForm) => {
    const payload = formattingPayload(data);

    dispatch(editData ? editProduct(payload) : addProduct(payload)).unwrap().then(() => {
      navigate(PAGE_ROUTES.PRODUCTS);
    }).catch((e) => {
      if (e.message === 'Subcategory with the provided title already exists in this category!') {
        // setError('title', { message: e.message });
      // eslint-disable-next-line max-len
      } else if (e.message === 'You have already chose the banners in the category, please disable one of them to proceed.') {
        // setError('displayAsCardInHeader', { message: e.message });
      } else {
        navigate(PAGE_ROUTES.PRODUCTS);
      }
    });
  };

  return (
    <FormProvider {...methods}>
      <StyledStack
        onSubmit={handleSubmit(onSubmit)}
        component="form"
      >
        <StyledTable tableTitle="BASIC INFO" colSpan={2}>

          {inputsRows1.map((item) => {
            const { label, isRequired } = item;

            return (
              <RowComponent key={label} label={label} isRequired={isRequired}>
                <ReusableFields
                  {...item}
                  selectList={[{
                    field: 'categoryId',
                    options: categoriesList,
                  },
                  {
                    field: 'subCategoryId',
                    options: getOptionsArray(subcategoriesList),
                  }]}
                />
              </RowComponent>
            );
          })}

          <RowComponent label="Product Weight (1)">
            <Input
              width="120px"
              placeholder="Product Weight"
              {...register('weight')}
              errorMessage={errors?.weight?.message as string}
            />
          </RowComponent>

          {inputsRows2.map((item) => {
            const { label, isRequired } = item;

            return (
              <RowComponent key={label} label={label} isRequired={isRequired}>
                <ReusableFields {...item} />
              </RowComponent>
            );
          })}
        </StyledTable>
        <SEO />

        <ProductDescription />
        {isGrandFormat && (
        <>
          <GrandFormatOptions />
          <GrandFormatDiscounts />
        </>
        )}
        <SubmitBtn actionLoading={actionLoading} />
      </StyledStack>
    </FormProvider>
  );
};

export default memo(InputsTable);
