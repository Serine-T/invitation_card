import { Dispatch, SetStateAction, memo } from 'react';

import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import TableCell from '@mui/material/TableCell';
import StyledTable from '@containers/common/Table';
import { StyledTableRow } from '@containers/common/Table/styled';
import { StyledStack, StyledTableCell } from '@containers/common/StyledAddEditTables/styled';
import PAGE_ROUTES from '@routes/routingEnum';
import { useAppDispatch, useAppSelector } from '@features/app/hooks';
import { useNavigate, useParams } from 'react-router-dom';
import { selectSubcategories } from '@features/subcategories/selectors';
import SubmitBtn from '@containers/common/Table/components/SubmitBtn';
import Input from '@containers/common/Input';
import { addProductsQuantity } from '@features/products/productsQuantity/actions';

import { AddDataSchema, IAddDataForm, defaultValues, formattingPayload } from './helpers';
import { headCells } from './tableData';

interface IAddComponent {
  setIsQuantityAdded: Dispatch<SetStateAction<boolean>>;
  isQuantityAdded: boolean;
}

const AddComponent = ({ setIsQuantityAdded, isQuantityAdded }:IAddComponent) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { actionLoading } = useAppSelector(selectSubcategories);

  const methods = useForm<IAddDataForm>({
    resolver: yupResolver(AddDataSchema as any), // TODO: add typing
    defaultValues: { ...defaultValues, productId: id },
  });

  const { handleSubmit, register, setError, setValue, formState: { errors } } = methods;

  const onSubmit = (data: IAddDataForm) => {
    const payload = formattingPayload(data);

    dispatch(addProductsQuantity(payload)).unwrap().then(() => {
      setValue('quantity', null);
      setIsQuantityAdded(!isQuantityAdded);
    }).catch((e) => {
      if (e.message === 'Product with specified quality already exists!') {
        setError('quantity', { message: e.message });
      } else {
        navigate(PAGE_ROUTES.PRODUCTS_PRODUCTS);
      }
    });
  };

  return (
    <FormProvider {...methods}>
      <StyledStack
        onSubmit={handleSubmit(onSubmit)}
        component="form"
        mb="32px"
      >
        <StyledTable headCells={headCells}>
          <StyledTableRow>
            <StyledTableCell>
              <Input
                placeholder="Quantity"
                {...register('quantity')}
                errorMessage={errors?.quantity?.message}
              />
            </StyledTableCell>
            <TableCell>
              <Input
                placeholder="Quantity"
                {...register('quantity')}
                errorMessage={errors?.quantity?.message}
              />
            </TableCell>
          </StyledTableRow>
        </StyledTable>
        <SubmitBtn actionLoading={actionLoading} />
      </StyledStack>
    </FormProvider>
  );
};

export default memo(AddComponent);
