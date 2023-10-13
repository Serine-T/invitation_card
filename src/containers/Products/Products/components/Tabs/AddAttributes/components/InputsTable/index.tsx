import { memo } from 'react';

import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { StyledStack } from '@containers/common/StyledAddEditTables/styled';
import { useAppDispatch, useAppSelector } from '@features/app/hooks';
import { selectSubcategories } from '@features/subcategories/selectors';
import SubmitBtn from '@containers/common/Table/components/SubmitBtn';
import Typography from '@mui/material/Typography';
import { selectAttributeCategories } from '@features/attributeCategories/selectors';
import { addProductsAttributes } from '@features/products/productsAttributes/actions';
import { useParams } from 'react-router-dom';
import { selectProductsAttributes } from '@features/products/productsAttributes/selectors';
import EmptyState from '@containers/common/EmptyState';

import {
  AddDataSchema,
  IAddDataForm,
  addingIsSelectedFlag,
  formattingPayload,
} from './helpers';
import { StyledDivider } from './styles';
import AttributesContainer from '../AttributesContainer';

const InputsTable = () => {
  const dispatch = useAppDispatch();
  const { id: productId } = useParams();
  const { actionLoading } = useAppSelector(selectSubcategories);
  const { data: productsAttributes } = useAppSelector(selectProductsAttributes);
  const { data: attributeCategories } = useAppSelector(selectAttributeCategories);
  const initialState = addingIsSelectedFlag(attributeCategories, productsAttributes);

  const methods = useForm<IAddDataForm>({
    resolver: yupResolver(AddDataSchema as any), // TODO: add typing
    defaultValues: { attributesList: initialState },
  });

  const { handleSubmit, watch } = methods;
  const attributesList = watch('attributesList');

  const onSubmit = (data: IAddDataForm) => {
    const body = formattingPayload(data);

    dispatch(addProductsAttributes({ body, id: productId as string }));
  };

  return (
    <>
      <FormProvider {...methods}>
        <StyledStack
          onSubmit={handleSubmit(onSubmit)}
          component="form"
        >
          <Typography variant="h9">Assigned attributes</Typography>

          {/* TODO: Implement empty state logic */}

          {attributesList.length ? attributesList.map(({ id, name }, attrCategoryIdx) => (
            <AttributesContainer
              key={id}
              sectionTitle={name}
              attrCategoryIdx={attrCategoryIdx}
              btn
            />
          )) : <EmptyState text="You don’t have any assigned attributes, please add new to proceed" />}
          <StyledDivider />
          <Typography variant="h9">All attributes</Typography>
          {attributesList.map(({ id, name }, attrCategoryIdx) => (
            <AttributesContainer
              key={id}
              sectionTitle={name}
              attrCategoryIdx={attrCategoryIdx}
            />
          ))}
          <SubmitBtn actionLoading={actionLoading} />
        </StyledStack>
      </FormProvider>
    </>
  );
};

export default memo(InputsTable);
