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
} from './helpers';

interface IInputsTable {
  bannersData?: IBannerInfo;
}

const InputsTable = ({ bannersData }: IInputsTable) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const methods = useForm<IAddBannerForm>({
    resolver: yupResolver(AddBannerSchema),
    defaultValues: bannersData ?? defaultValues,
  });

  const { errorMessage, actionLoading } = useAppSelector(selectBanners);

  const {
    handleSubmit,
  } = methods;

  const onSubmit = async (data: IAddBannerForm) => {
    await dispatch(bannersData ? editBanner(data) : addBanner(data)).unwrap().then(() => {
      // navigate(PAGE_ROUTES.HOMEPAGE);
    }).catch(() => {});
  };

  return (
    <TitlesWithBackButton title={bannersData ? 'Edit Banner' : 'Add Banner'} path={PAGE_ROUTES.HOMEPAGE}>
      <FormProvider {...methods}>
        <StyledStack
          onSubmit={handleSubmit(onSubmit)}
          component="form"
        >
          <StyledTable tableTitle="BANNER" colSpan={2}>
            {inputsRows.map((item) => (
              (item.field !== 'category' || !bannersData) ? (
                <StyledTableRow key={item.label}>
                  <StyledTableCell>{`${item.label}:`}</StyledTableCell>
                  <TableCell>
                    <ReusableFields {...item} selectList={[{ field: item.field, options: ['slider', 'banner'] }]} />
                  </TableCell>
                </StyledTableRow>
              ) : null
            ))}
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
