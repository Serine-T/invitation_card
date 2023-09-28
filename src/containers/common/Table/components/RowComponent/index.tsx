import { ReactNode, memo } from 'react';

import { StyledTableCell } from '@containers/common/StyledAddEditTables/styled';
import { StyledTableRow } from '@containers/common/Table/styled';
import TableCell from '@mui/material/TableCell';
import { TableRowProps } from '@mui/material';

interface IRowComponent extends TableRowProps {
  label: string;
  isRequired?: boolean;
  children: ReactNode;
}

const RowComponent = ({ label, isRequired, children, ...props }: IRowComponent) => (
  <StyledTableRow {...props}>
    <StyledTableCell>
      {`${label}: ${isRequired ? '*' : ''}`}
    </StyledTableCell>
    <TableCell>{children}</TableCell>
  </StyledTableRow>
);

export default memo(RowComponent);
