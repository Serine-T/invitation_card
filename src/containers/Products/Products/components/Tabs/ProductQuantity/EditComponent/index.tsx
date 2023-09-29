import { memo } from 'react';

import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import TableCell from '@mui/material/TableCell';
import { StyledMuiTable, StyledTableContainer, StyledTableRow } from '@containers/common/Table/styled';
import { StyledStack } from '@containers/common/StyledAddEditTables/styled';
import PAGE_ROUTES from '@routes/routingEnum';
import { useAppDispatch, useAppSelector } from '@features/app/hooks';
import { useNavigate, useParams } from 'react-router-dom';
import { selectSubcategories } from '@features/subcategories/selectors';
import SubmitBtn from '@containers/common/Table/components/SubmitBtn';
import { IProductsPayload } from '@features/products/basicInfo/types';
import {
  addProductsQuantity,
  deleteProductsQuantity, editProductsQuantity,
} from '@features/products/productsQuantity/actions';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import AddTextBtn from '@containers/common/Table/components/AddTextBtn';

import {
  AddDataSchema,
  IAddDataForm,
  defaultValues,
  formattingPayload,
} from './helpers';
import { fakeData } from './fakeData';
import QuantityRow from './components/QuantityRow';

interface IEditComponent{
  editData?: IProductsPayload;
}

const EditComponent = ({ editData }: IEditComponent) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { actionLoading } = useAppSelector(selectSubcategories);

  const methods = useForm<IAddDataForm>({
    resolver: yupResolver(AddDataSchema as any), // TODO: add typing
    defaultValues: { ...editData, productId: id } || defaultValues,
  });

  const {
    handleSubmit,
    // register,
    // formState: { errors },
  } = methods;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const deleteAction = (quantityId: string) => {
    dispatch(deleteProductsQuantity(quantityId)).unwrap().then(() => {
      // fetchData();
    }).catch(() => {});
  };

  const onSubmit = (data: IAddDataForm) => {
    const payload = formattingPayload(data);

    dispatch(editData ? editProductsQuantity(payload) : addProductsQuantity(payload)).unwrap().then(() => {
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

  const handleAddInput = () => {};

  return (
    <FormProvider {...methods}>
      <StyledStack
        onSubmit={handleSubmit(onSubmit)}
        component="form"
        mb="32px"
      >
        {
          fakeData.map((item) => (
            <StyledTableContainer key={item.quantityId} sx={{ marginBottom: '16px' }}>
              <StyledMuiTable>
                <TableHead>
                  <StyledTableRow>
                    <TableCell>Quantity</TableCell>
                    <TableCell>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography>INK & turn around</Typography>
                        <AddTextBtn text="+Add new Ink" handleAdd={handleAddInput} />
                      </Stack>
                    </TableCell>
                    <TableCell>Actions</TableCell>
                  </StyledTableRow>
                </TableHead>
                <TableBody>
                  <QuantityRow {...item} />
                </TableBody>
              </StyledMuiTable>
            </StyledTableContainer>
          ))
        }

        <SubmitBtn actionLoading={actionLoading} />
      </StyledStack>
    </FormProvider>
  );
};

export default memo(EditComponent);
