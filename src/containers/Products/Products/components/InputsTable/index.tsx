import { memo, useEffect, useState } from 'react';

import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import TableCell from '@mui/material/TableCell';
import StyledTable from '@containers/common/Table';
import { StyledTableRow } from '@containers/common/Table/styled';
import { StyledStack, StyledTableCell } from '@containers/common/StyledAddEditTables/styled';
import TitlesWithBackButton from '@containers/common/TitlesWithBackButton';
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

import {
  AddDataSchema,
  IAddDataForm,
  defaultValues,
  formattingPayload,
  inputsRows1,
  inputsRows2,
} from './helpers';
import SEO from './SEO';
import ProductDescription from './ProductDescription';
import GrandFormatOptions from './GrandFormatOptions';

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
    formState: { errors },
  } = methods;

  const { categoryId, subCategoryId, isGrandFormat } = watch();

  console.log('errors***', errors);

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
        setValue('subCategoryId', '');
      });
  }, [categoryId, dispatch, setValue]);

  useEffect(() => {
    const currentSubcategory = subcategoriesList.find((item) => item.id === subCategoryId);

    setValue('isGrandFormat', !!currentSubcategory?.useGrandFormatSQFtTemplate);
    if (!currentSubcategory?.useGrandFormatSQFtTemplate) {
      setValue('grandFormatOptions', null);
    }

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
    <TitlesWithBackButton
      title={editData ? 'Edit Product' : 'Add Product'}
      path={PAGE_ROUTES.PRODUCTS}
    >
      <FormProvider {...methods}>
        <StyledStack
          onSubmit={handleSubmit(onSubmit)}
          component="form"
        >
          <StyledTable tableTitle="SUBCATEGORY" colSpan={2}>

            {inputsRows1.map((item) => {
              const { label, isRequired } = item;

              return (
                <StyledTableRow key={label}>
                  <StyledTableCell>
                    {`${label}: ${isRequired ? '*' : ''}`}
                  </StyledTableCell>
                  <TableCell>
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
                  </TableCell>
                </StyledTableRow>
              );
            })}

            {inputsRows2.map((item) => {
              const { label, isRequired } = item;

              return (
                <StyledTableRow key={label}>
                  <StyledTableCell>
                    {`${label}: ${isRequired ? '*' : ''}`}
                  </StyledTableCell>
                  <TableCell>
                    <ReusableFields {...item} />
                  </TableCell>
                </StyledTableRow>
              );
            })}
          </StyledTable>
          <SEO />

          <ProductDescription />
          {isGrandFormat && (
            <>
              <GrandFormatOptions />
            </>
          )}
          <SubmitBtn actionLoading={actionLoading} />
        </StyledStack>
      </FormProvider>
    </TitlesWithBackButton>
  );
};

export default memo(InputsTable);
