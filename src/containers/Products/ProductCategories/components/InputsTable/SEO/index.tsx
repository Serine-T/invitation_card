import { memo } from 'react';

import StyledTable from '@containers/common/Table';
import Box from '@mui/material/Box';
import RowComponent from '@containers/common/Table/components/RowComponent';
import InputAfterText from '@containers/common/Table/components/InputAfterText';
import Input from '@containers/common/Input';
import { useFormContext } from 'react-hook-form';

import { seoFields } from './helpers';

const SEO = () => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <Box mt="24px">
      <StyledTable tableTitle="SEARCH ENGINE OPTIMIZATION" colSpan={2}>

        {seoFields.map((item) => {
          const { field, label } = item;

          return (
            <RowComponent key={field} label={label}>
              <InputAfterText label="(max 250)">
                <Input
                  placeholder={label}
                  {...register(field)}
                  errorMessage={errors?.[field]?.message as string}
                />
              </InputAfterText>
            </RowComponent>
          );
        })}
        <RowComponent label="Meta Tag Keywords">
          <Input
            placeholder="Meta Tag Keywords"
            {...register('metaTagKeywords')}
            errorMessage={errors?.metaTagTitle?.message as string}
          />
        </RowComponent>
      </StyledTable>
    </Box>
  );
};

export default memo(SEO);
