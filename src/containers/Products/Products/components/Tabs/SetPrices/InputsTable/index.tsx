import { memo } from 'react';

import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { StyledStack } from '@containers/common/StyledAddEditTables/styled';
import { useAppDispatch, useAppSelector } from '@features/app/hooks';
import { addProductsPrices } from '@features/products/setPrice/actions';
import { selectProductsSetPrice } from '@features/products/setPrice/selectors';
import { useParams } from 'react-router-dom';
import SubmitBtn from '@containers/common/Table/components/SubmitBtn';
import EmptyState from '@containers/common/EmptyState';
import Box from '@mui/material/Box';
import { setProductsPrices } from '@features/products/setPrice/slice';

import { AddDataSchema, IAddDataForm, formattingPayload } from './helpers';
import InkTurnAroundsTable from './InkTurnAroundsTable';
import AttributesTable from './AttributesTable';

const InputsTable = () => {
  const dispatch = useAppDispatch();
  const { id: productId } = useParams();

  const { data: productsPrices, actionLoading } = useAppSelector(selectProductsSetPrice);

  const methods = useForm<IAddDataForm>({
    resolver: yupResolver(AddDataSchema as any), // TODO: add typing
    defaultValues: { productsPrices },
  });

  const { handleSubmit, watch } = methods;

  const onSubmit = (data: IAddDataForm) => {
    const body = formattingPayload(data);

    dispatch(addProductsPrices({ body, id: productId as string })).unwrap().then(() => {
      dispatch(setProductsPrices(data.productsPrices));
    }).catch(() => { });
  };

  const productsPricesData = watch('productsPrices');

  return (
    productsPricesData.length ? (
      <FormProvider {...methods}>
        <StyledStack
          onSubmit={handleSubmit(onSubmit)}
          component="form"
        >
          {productsPricesData.map((_, tableIdx) => (
            // eslint-disable-next-line react/no-array-index-key
            <Box key={tableIdx}>
              <InkTurnAroundsTable tableIdx={tableIdx} />
              <AttributesTable tableIdx={tableIdx} />
            </Box>
          ))}
          <SubmitBtn actionLoading={actionLoading} />
        </StyledStack>
      </FormProvider>
    ) : (
      <EmptyState text="You don’t have any prices, please add new to proceed" />
    )

  );
};

export default memo(InputsTable);
