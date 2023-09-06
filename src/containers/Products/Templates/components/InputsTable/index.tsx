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
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@features/app/hooks';
import { ITemplate } from '@features/templates/types';
import { selectTemplates } from '@features/templates/selectors';
import { addTemplate, editTemplate } from '@features/templates/actions';
import { selectSubcategories } from '@features/subcategories/selectors';
import { getOptionsArray } from '@utils/helpers';
import { selectTemplateCategories } from '@features/templateCategories/selectors';

import {
  AddDataSchema,
  IAddDataForm,
  inputsRows,
  defaultValues,
  formattedPayload,
} from './helpers';

interface IInputsTable{
  templatesData?: ITemplate;
}

const InputsTable = ({ templatesData }: IInputsTable) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { actionLoading } = useAppSelector(selectTemplates);
  const { data: subcategories } = useAppSelector(selectSubcategories);
  const { data: templateCategories } = useAppSelector(selectTemplateCategories);

  const subcategoriesList = getOptionsArray(subcategories);
  const templateCategoriesList = getOptionsArray(templateCategories, 'name');
  const methods = useForm<IAddDataForm>({
    resolver: yupResolver(AddDataSchema),
    defaultValues: templatesData ?? defaultValues,
  });

  const {
    handleSubmit,
    setError,
  } = methods;

  const onSubmit = (data: IAddDataForm) => {
    const payload = formattedPayload(data);

    dispatch(templatesData ? editTemplate(payload) : addTemplate(payload)).unwrap().then(() => {
      navigate(PAGE_ROUTES.TEMPLATES);
    }).catch((e) => {
      if (e.message === 'Template with the provided name, categoryId and templateId already exists!') {
        setError('name', { message: e.message });
      } else {
        navigate(PAGE_ROUTES.TEMPLATES);
      }
    });
  };

  return (
    <TitlesWithBackButton
      title={templatesData ? 'Edit Template' : 'Add Template'}
      path={PAGE_ROUTES.TEMPLATES}
    >
      <FormProvider {...methods}>
        <StyledStack
          onSubmit={handleSubmit(onSubmit)}
          component="form"
        >
          <StyledTable tableTitle="TEMPLATE" colSpan={2}>
            {inputsRows.map((item) => {
              const { label } = item;

              return (
                <StyledTableRow key={label}>
                  <StyledTableCell>{`${label}:`}</StyledTableCell>
                  <TableCell>
                    <ReusableFields
                      {...item}
                      selectList={[{
                        field: 'subCategoryId',
                        options: subcategoriesList,
                      }, {
                        field: 'templateCategoryId',
                        options: templateCategoriesList,
                      }]}
                    />
                  </TableCell>
                </StyledTableRow>
              );
            })}
          </StyledTable>
          <StyledButton
            type="submit"
            disabled={actionLoading}
            isLoading={actionLoading}
          >
            Submit
          </StyledButton>
        </StyledStack>
      </FormProvider>
    </TitlesWithBackButton>
  );
};

export default memo(InputsTable);
