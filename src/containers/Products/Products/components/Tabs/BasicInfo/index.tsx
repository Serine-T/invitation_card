import { memo, useEffect, useRef, useState } from 'react';

import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import StyledTable from '@containers/common/Table';
import { StyledStack } from '@containers/common/StyledAddEditTables/styled';
import PAGE_ROUTES from '@routes/routingEnum';
import ReusableFields from '@containers/common/Table/components/ReusableFields';
import { useAppDispatch, useAppSelector } from '@features/app/hooks';
import { selectCategories } from '@features/categories/selectors';
import { getOptionsArray } from '@utils/helpers';
import { useNavigate } from 'react-router-dom';
import { selectSubcategories } from '@features/subcategories/selectors';
import SubmitBtn from '@containers/common/Table/components/SubmitBtn';
import { addProduct, editProduct } from '@features/products/basicInfo/actions';
import { IProductsPayload } from '@features/products/basicInfo/types';
import { getSubcategoriesByCategoryId } from '@features/subcategories/actions';
import { ISubcategoriesByCategoryId } from '@features/subcategories/types';
import Input from '@containers/common/Input';
import SEO from '@containers/Products/ProductCategories/components/InputsTable/SEO';
import RowComponent from '@containers/common/Table/components/RowComponent';
import InputAfterText from '@containers/common/Table/components/InputAfterText';

import {
  AddDataSchema,
  IAddDataForm,
  defaultGrandFormatValues,
  defaultValues,
  formattingPayload,
  inputsRows1,
  inputsRows2,
} from './helpers';
import ProductDescription from './components/ProductDescription';
import GrandFormatOptions from './components/GrandFormatOptions';
import GrandFormatDiscounts from './components/GrandFormatDiscounts';

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
    setError,
  } = methods;

  const { categoryId, subCategoryId, grandFormatOptions } = watch();
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

    setValue(
      'grandFormatOptions',
      !currentSubcategory?.useGrandFormatSQFtTemplate ? null
        : defaultGrandFormatValues,
    );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subCategoryId]);

  const onSubmit = (data: IAddDataForm) => {
    const payload = formattingPayload(data);

    if (payload) {
      dispatch(editData ? editProduct(payload) : addProduct(payload)).unwrap().then(() => {
        navigate(PAGE_ROUTES.PRODUCTS_PRODUCTS);
      }).catch((e) => {
        if (e.message === 'Product with provided name already exists in this sub category!') {
          setError('name', { message: e.message });
        } else if (e.message === 'Product with provided product SKU already exists!') {
          setError('productSKU', { message: e.message });
        } else {
          navigate(PAGE_ROUTES.PRODUCTS_PRODUCTS);
        }
      });
    }
  };

  return (
    <FormProvider {...methods}>
      <StyledStack
        onSubmit={handleSubmit(onSubmit)}
        component="form"
      >
        <StyledTable tableTitle="BASIC PRODUCT INFO" colSpan={2}>

          {inputsRows1.map((item) => (
            <RowComponent key={item.label} {...item}>
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
          ))}

          <RowComponent label="Product Weight (1)">
            <Input
              width="120px"
              placeholder="Product Weight"
              {...register('weight')}
              errorMessage={errors?.weight?.message}
            />
          </RowComponent>

          {inputsRows2.map((item) => (
            <RowComponent key={item.label} {...item}>
              <ReusableFields {...item} />
            </RowComponent>
          ))}

          <RowComponent label="4over Turnaround Code">
            <InputAfterText label="(i.e. 224, 223, etc)">
              <Input
                placeholder="4over Turnaround Code"
                {...register('fouroverTurnaroundCode')}
                errorMessage={errors?.fouroverTurnaroundCode?.message}
              />
            </InputAfterText>
          </RowComponent>
        </StyledTable>
        {/* TODO: Delete SEO component in this folder if not used */}
        <SEO />

        <ProductDescription />
        {grandFormatOptions && (
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
