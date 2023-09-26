import { memo } from 'react';

import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import TableCell from '@mui/material/TableCell';
import StyledTable from '@containers/common/Table';
import { StyledTableRow } from '@containers/common/Table/styled';
import { StyledStack, StyledTableCell } from '@containers/common/StyledAddEditTables/styled';
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
import Input from '@containers/common/Input';

import {
  AddDataSchema,
  IAddDataForm,
  defaultValues,
  formattingPayload,
  inputsRows1,
} from './helpers';
import AddComponent from './components/AddComponent';

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

  const methods = useForm<IAddDataForm>({
    resolver: yupResolver(AddDataSchema as any), // TODO: add typing
    defaultValues: editData || defaultValues,
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  const onSubmit = (data: IAddDataForm) => {
    const payload = formattingPayload(data);

    dispatch(editData ? editProduct(payload) : addProduct(payload)).unwrap().then(() => {
      navigate(PAGE_ROUTES.PRODUCTS_PRODUCTS);
    }).catch((e) => {
      if (e.message === 'Subcategory with the provided title already exists in this category!') {
        // setError('title', { message: e.message });
      // eslint-disable-next-line max-len
      } else if (e.message === 'You have already chose the banners in the category, please disable one of them to proceed.') {
        // setError('displayAsCardInHeader', { message: e.message });
      } else {
        navigate(PAGE_ROUTES.PRODUCTS_PRODUCTS);
      }
    });
  };

  return (
    <>
      <AddComponent />
      <FormProvider {...methods}>
        <StyledStack
          onSubmit={handleSubmit(onSubmit)}
          component="form"
        >
          <StyledTable tableTitle="Quantity" colSpan={2}>

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
                      }]}
                    />
                  </TableCell>
                </StyledTableRow>
              );
            })}
            <StyledTableRow>
              <StyledTableCell>
                Product Weight (1):
              </StyledTableCell>
              <TableCell>
                <Input
                  width="120px"
                  placeholder="Product Weight"
                  {...register('weight')}
                  errorMessage={errors?.weight?.message as string}
                />
              </TableCell>
            </StyledTableRow>
          </StyledTable>
          <SubmitBtn actionLoading={actionLoading} />
        </StyledStack>
      </FormProvider>
    </>
  );
};

export default memo(InputsTable);
