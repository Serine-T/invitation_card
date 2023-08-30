import { memo } from 'react';

import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import TableCell from '@mui/material/TableCell';
import StyledTable from '@containers/common/Table';
import { StyledTableRow } from '@containers/common/Table/styled';
import { StyledButton, StyledStack, StyledTableCell } from '@containers/common/StyledAddEditTables/styled';
import TitlesWithBackButton from '@containers/common/TitlesWithBackButton';
import PAGE_ROUTES from '@routes/routingEnum';
import ReusableFields from '@containers/common/ReusableFields';
import { IBannerInfo } from '@features/banners/types';
import { addBanner, editBanner } from '@features/banners/actions';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@features/app/hooks';
import ErrorMessage from '@containers/common/ErrorMessage';
import { selectBanners } from '@features/banners/selectors';

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

  const { errorMessage, actionLoading } = useAppSelector(selectBanners);

  const {
    handleSubmit,
  } = methods;

  const onSubmit = (data: IAddBannerForm) => {
    dispatch(bannersData ? editBanner(data) : addBanner(data)).unwrap().then(() => {
      navigate(PAGE_ROUTES.HOMEPAGE);
    }).catch((e) => {
      if (e.message === 'Banner does not exist!') {
        navigate(PAGE_ROUTES.HOMEPAGE);
      }
    });
  };

  return (
    <TitlesWithBackButton title={bannersData ? 'Edit Banner' : 'Add Banner'} path={PAGE_ROUTES.HOMEPAGE}>
      <FormProvider {...methods}>
        <StyledStack
          onSubmit={handleSubmit(onSubmit)}
          component="form"
        >
          <StyledTable tableTitle="BANNER" colSpan={2}>
            {inputsRows.map((item) => {
              const { field, label, isRequired } = item;

              return (
                (field !== 'category' || !bannersData) ? (
                  <StyledTableRow key={label}>
                    <StyledTableCell>
                      {`${label}: ${isRequired ? '*' : ''}`}
                    </StyledTableCell>
                    <TableCell>
                      <ReusableFields {...item} selectList={[{ field, options: bannersTypeList }]} />
                    </TableCell>
                  </StyledTableRow>
                ) : null
              );
            })}
          </StyledTable>
          { !!errorMessage && <ErrorMessage message={errorMessage} />}
          <StyledButton
            disabled={actionLoading}
            isLoading={actionLoading}
            type="submit"
          >
            Submit
          </StyledButton>
        </StyledStack>
      </FormProvider>
    </TitlesWithBackButton>
  );
};

export default memo(InputsTable);
