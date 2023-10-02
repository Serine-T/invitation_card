import { memo } from 'react';

import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { StyledStack } from '@containers/common/StyledAddEditTables/styled';
import PAGE_ROUTES from '@routes/routingEnum';
import { useAppDispatch, useAppSelector } from '@features/app/hooks';
import { useNavigate } from 'react-router-dom';
import { selectSubcategories } from '@features/subcategories/selectors';
import SubmitBtn from '@containers/common/Table/components/SubmitBtn';
import { addProduct, editProduct } from '@features/products/basicInfo/actions';
import { IProductsPayload } from '@features/products/basicInfo/types';
import Typography from '@mui/material/Typography';

import {
  AddDataSchema,
  IAddDataForm,
  defaultValues,
  formattingPayload,
} from './helpers';
import SearchSection from './components/SearchSection';
import AttributesContainer from './components/AttributesContainer';
import { StyledDivider } from './styles';

interface IInputsTable{
  editData?: IProductsPayload;
}

const InputsTable = ({ editData }: IInputsTable) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { actionLoading } = useAppSelector(selectSubcategories);

  const methods = useForm<IAddDataForm>({
    resolver: yupResolver(AddDataSchema as any), // TODO: add typing
    defaultValues: editData || defaultValues,
  });

  const {
    handleSubmit,

  } = methods;

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
    <>
      <SearchSection />
      <StyledDivider />
      <FormProvider {...methods}>
        <StyledStack
          onSubmit={handleSubmit(onSubmit)}
          component="form"
        >
          <Typography variant="h9">Assigned attributes</Typography>
          <AttributesContainer
            sectionTitle="Stock"
            data={[
              { title: 'Out-Scrimt' },
              { title: 'In-Vinyl' },
            ]}
            btn
          />
          <AttributesContainer
            sectionTitle="Finish/Coating"
            data={[
              { title: 'Out-Scrimt' },
              { title: 'In-Vinyl' },
            ]}
            btn
          />
          <StyledDivider />
          <Typography variant="h9">All attributes</Typography>
          <AttributesContainer
            sectionTitle="Stock"
            data={[
              { title: 'Out-Scrimt' },
              { title: 'In-Vinyl' },
            ]}
          />
          <AttributesContainer
            sectionTitle="Finish/Coating"
            data={[
              { title: 'Out-Scrimt' },
              { title: 'In-Vinyl' },
            ]}
          />
          <SubmitBtn actionLoading={actionLoading} />
        </StyledStack>
      </FormProvider>
    </>
  );
};

export default memo(InputsTable);
