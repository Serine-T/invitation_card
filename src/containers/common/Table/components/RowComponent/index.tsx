import { ReactNode, memo } from 'react';

import { StyledTableCell } from '@containers/common/StyledAddEditTables/styled';
import { StyledTableRow } from '@containers/common/Table/styled';
import TableCell from '@mui/material/TableCell';

interface IRowComponent {
  label: string;
  isRequired?: boolean;
  children: ReactNode;
}

const RowComponent = ({ label, isRequired, children }: IRowComponent) => (
  <StyledTableRow>
    <StyledTableCell>
      {`${label}: ${isRequired ? '*' : ''}`}
    </StyledTableCell>
    <TableCell>{children}</TableCell>
  </StyledTableRow>
);

export default memo(RowComponent);
