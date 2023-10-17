import { memo } from 'react';

import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { StyledStack } from '@containers/common/StyledAddEditTables/styled';
import { useAppDispatch, useAppSelector } from '@features/app/hooks';
import { addProductsPrices } from '@features/products/setPrice/actions';
import { selectProductsSetPrice } from '@features/products/setPrice/selectors';
import { useParams } from 'react-router-dom';
import SubmitBtn from '@containers/common/Table/components/SubmitBtn';
import { setProductsPrices } from '@features/products/setPrice/slice';
import StyledTable from '@containers/common/Table';

import { AddDataSchema, IAddDataForm, formattingPayload } from './helpers';
import TableRow from './TableRow';

const InputsTable = () => {
  const dispatch = useAppDispatch();
  const { id: productId } = useParams();

  const { data: { quantities }, actionLoading } = useAppSelector(selectProductsSetPrice);

  const methods = useForm<IAddDataForm>({
    resolver: yupResolver(AddDataSchema as any), // TODO: add typing
    defaultValues: { quantities },
  });

  const { handleSubmit, watch } = methods;

  const onSubmit = (data: IAddDataForm) => {
    const body = formattingPayload(data);

    dispatch(addProductsPrices({ body, id: productId as string })).unwrap().then(() => {
      dispatch(setProductsPrices(data));
    }).catch(() => { });
  };

  const productsPricesData = watch('quantities');
  const attributeCategoriesNames = productsPricesData[0].attributeCategories.map((item) => ({
    label: item.name,
  }));

  const headCells = [{
    label: 'QUANTITY',
  }, ...attributeCategoriesNames];

  return (
    <FormProvider {...methods}>
      <StyledStack
        onSubmit={handleSubmit(onSubmit)}
        component="form"
      >
        <StyledTable headCells={headCells}>
          {productsPricesData.map((_, rowIdx: number) => (
            // eslint-disable-next-line react/no-array-index-key
            <TableRow key={rowIdx} rowIdx={rowIdx} />
          ))}

        </StyledTable>
        <SubmitBtn actionLoading={actionLoading} />
      </StyledStack>
    </FormProvider>
  );
};

export default memo(InputsTable);
