import { ReactNode, memo } from 'react';

import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';

import { StyledMuiTable, StyledPagination, StyledTableContainer, StyledTableRow } from './styled';
import { ITableHeadCell } from './helpers';

interface IStyledTable {
  headCells?: ITableHeadCell[];
  children: ReactNode;
  tableTitle?: string;
  colSpan?: number;
  hasPagination?: boolean;
 }

const StyledTable = ({
  headCells, children, tableTitle, colSpan, hasPagination = false,
}: IStyledTable) => {
  return (
    <>
      <StyledTableContainer>
        <StyledMuiTable>
          <TableHead>
            <StyledTableRow>
              {
                tableTitle ? <TableCell colSpan={colSpan}>{tableTitle}</TableCell>
                  : (headCells ? headCells.map((props) => {
                    const { label } = props;

                    return (
                      <TableCell key={label} {...props}>{label}</TableCell>
                    );
                  }) : null)
                }
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {children}
          </TableBody>
        </StyledMuiTable>
      </StyledTableContainer>
      {hasPagination && <StyledPagination count={11} defaultPage={1} />}
    </>
  );
};

export default memo(StyledTable);
