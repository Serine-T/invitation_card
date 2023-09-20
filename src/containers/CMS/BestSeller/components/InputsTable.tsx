import { memo } from 'react';

import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import StyledTable from '@containers/common/Table';
import { StyledStack } from '@containers/common/StyledAddEditTables/styled';
import TitlesWithBackButton from '@containers/common/TitlesWithBackButton';
import PAGE_ROUTES from '@routes/routingEnum';
import { IBestSellerInfo } from '@features/bestSellers/types';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@features/app/hooks';
import { addBestSeller, editBestSeller } from '@features/bestSellers/actions';
import ReusableFields from '@containers/common/ReusableFields';
import { selectBestSellers } from '@features/bestSellers/selectors';
import { selectSubcategories } from '@features/subcategories/selectors';
import { getOptionsArray } from '@utils/helpers';
import SubmitBtn from '@containers/common/Table/components/SubmitBtn';
import RowComponent from '@containers/common/Table/components/RowComponent';

import {
  AddBestSellerSchema,
  IAddBestSellerForm,
  inputsRows,
  defaultValues,
} from './helpers';

interface IInputsTable {
  bestSellerData?: IBestSellerInfo;
}

const InputsTable = ({ bestSellerData }: IInputsTable) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    actionLoading,
  } = useAppSelector(selectBestSellers);

  const { data: subcategories } = useAppSelector(selectSubcategories);
  const subcategoriesList = getOptionsArray(subcategories);

  const methods = useForm<IAddBestSellerForm>({
    resolver: yupResolver(AddBestSellerSchema),
    defaultValues: bestSellerData ?? defaultValues,
  });

  const {
    handleSubmit,
  } = methods;

  const onSubmit = (data: IAddBestSellerForm) => {
    dispatch(bestSellerData ? editBestSeller(data) : addBestSeller(data)).unwrap().then(() => {
      navigate(PAGE_ROUTES.BEST_SELLER);
    }).catch((e) => {
      if (e.message === 'Bestseller section does not exist!') {
        navigate(PAGE_ROUTES.BEST_SELLER);
      }
    });
  };

  return (
    <TitlesWithBackButton title={bestSellerData ? 'Edit Section' : 'Add Section'} path="BEST_SELLER">
      <FormProvider {...methods}>
        <StyledStack
          onSubmit={handleSubmit(onSubmit)}
          component="form"
        >
          <StyledTable tableTitle="SECTION" colSpan={2}>
            {inputsRows.map((item) => (
              <RowComponent key={item.label} {...item}>
                <ReusableFields
                  {...item}
                  selectList={[
                    {
                      field: 'subCategory',
                      options: subcategoriesList,
                    }, {
                      field: 'product',
                      options: [],
                    }]}
                />
              </RowComponent>
            ))}
          </StyledTable>
          <SubmitBtn actionLoading={actionLoading} />
        </StyledStack>
      </FormProvider>
    </TitlesWithBackButton>
  );
};

export default memo(InputsTable);
