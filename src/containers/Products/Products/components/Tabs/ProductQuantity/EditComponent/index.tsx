import { memo, useEffect } from 'react';

import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { StyledStack } from '@containers/common/StyledAddEditTables/styled';
import { useAppDispatch, useAppSelector } from '@features/app/hooks';
import { useParams } from 'react-router-dom';
import SubmitBtn from '@containers/common/Table/components/SubmitBtn';
import { editProductsQuantities } from '@features/products/productsQuantity/actions';
import { selectProductsQuantities } from '@features/products/productsQuantity/selectors';

import { AddDataSchema, IAddDataForm, formattingPayload } from './helpers';
import QuantityTable from './components/QuantityTable';

const EditComponent = () => {
  const dispatch = useAppDispatch();
  const { actionLoading, data: productQuantities } = useAppSelector(selectProductsQuantities);
  const { id } = useParams();

  const methods = useForm<IAddDataForm>({
    resolver: yupResolver(AddDataSchema as any),
    defaultValues: { quantities: productQuantities },
  });

  const { handleSubmit, watch, setValue } = methods;

  useEffect(() => {
    setValue('quantities', productQuantities);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productQuantities]);

  const onSubmit = (data: IAddDataForm) => {
    const body = formattingPayload(data);

    dispatch(editProductsQuantities({ body, id: id as string })).unwrap().then(() => {
    }).catch(() => { });
  };

  const { quantities } = watch();

  return (
    !!quantities.length && (
    <FormProvider {...methods}>
      <StyledStack
        onSubmit={handleSubmit(onSubmit)}
        component="form"
        mb="32px"
      >
        {
          quantities.map((_: any, idx: number) => (
            // eslint-disable-next-line react/no-array-index-key
            <QuantityTable key={idx} idx={idx} />
          ))
        }
        <SubmitBtn actionLoading={actionLoading} />
      </StyledStack>
    </FormProvider>
    )
  );
};

export default memo(EditComponent);
