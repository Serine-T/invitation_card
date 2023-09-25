import { memo } from 'react';

import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import StyledTable from '@containers/common/Table';
import { StyledStack } from '@containers/common/StyledAddEditTables/styled';
import TitlesWithBackButton from '@containers/common/TitlesWithBackButton';
import PAGE_ROUTES from '@routes/routingEnum';
import ReusableFields from '@containers/common/Table/components/ReusableFields';
import { IBannerInfo } from '@features/banners/types';
import { addBanner, editBanner } from '@features/banners/actions';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@features/app/hooks';
import { selectBanners } from '@features/banners/selectors';
import SubmitBtn from '@containers/common/Table/components/SubmitBtn';
import RowComponent from '@containers/common/Table/components/RowComponent';

import {
  AddBannerSchema,
  IAddBannerForm,
  inputsRows,
  defaultValues,
  bannersTypeList,
} from './helpers';

interface IInputsTable {
  bannersData?: IBannerInfo;
}

const InputsTable = ({ bannersData }: IInputsTable) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const methods = useForm<IAddBannerForm>({
    resolver: yupResolver(AddBannerSchema as any), // TODO: change any
    defaultValues: bannersData ?? defaultValues,
  });

  const { actionLoading } = useAppSelector(selectBanners);

  const {
    handleSubmit,
    setError,
  } = methods;

  const onSubmit = (data: IAddBannerForm) => {
    dispatch(bannersData ? editBanner(data) : addBanner(data)).unwrap().then(() => {
      navigate(PAGE_ROUTES.HOMEPAGE);
    }).catch((e) => {
      if (e.message === 'Banner does not exist!') {
        navigate(PAGE_ROUTES.HOMEPAGE);
      }

      if (e.message === 'Banner limit exceeded') {
        setError(
          'category',
          { message: 'You can not add more than two Banners. Please choose a Slider or remove one of the Banners' },
        );
      }
    });
  };

  return (
    <TitlesWithBackButton title={bannersData ? 'Edit Banner' : 'Add Banner'} path="HOMEPAGE">
      <FormProvider {...methods}>
        <StyledStack
          onSubmit={handleSubmit(onSubmit)}
          component="form"
        >
          <StyledTable tableTitle="BANNER" colSpan={2}>
            {inputsRows.map((item) => {
              const { field } = item;

              return (
                (field !== 'category' || !bannersData) ? (
                  <RowComponent key={item.label} {...item}>
                    <ReusableFields {...item} selectList={[{ field, options: bannersTypeList }]} />
                  </RowComponent>
                ) : null
              );
            })}
          </StyledTable>
          <SubmitBtn actionLoading={actionLoading} />
        </StyledStack>
      </FormProvider>
    </TitlesWithBackButton>
  );
};

export default memo(InputsTable);
