import { memo } from 'react';

import TableCell from '@mui/material/TableCell';
import StyledTable from '@containers/common/Table';
import { StyledTableRow } from '@containers/common/Table/styled';
import { StyledTableCell } from '@containers/common/StyledAddEditTables/styled';
import ReusableFields from '@containers/common/ReusableFields';
import { Box } from '@mui/material';

import { seoFields } from './helpers';

const SEO = () => {
  return (
    <Box mt="24px">
      <StyledTable tableTitle="SEARCH ENGINE OPTIMIZATION" colSpan={2}>
        {seoFields.map((item) => {
          const { label, isRequired } = item;

          return (
            <StyledTableRow key={label}>
              <StyledTableCell>
                {`${label}: ${isRequired ? '*' : ''}`}
              </StyledTableCell>
              <TableCell>
                <ReusableFields {...item} />
              </TableCell>
            </StyledTableRow>
          );
        })}
      </StyledTable>
    </Box>
  );
};

export default memo(SEO);
