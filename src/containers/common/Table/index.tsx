import { ReactNode, memo } from 'react';

import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';

import { StyledMuiTable, StyledPagination, StyledTableContainer, StyledTableRow } from './styled';
import { ITableHeadCell } from './helpers';

interface IStyledTable {
  test?: string;
  headCells?: ITableHeadCell[];
  children: ReactNode;
  tableTitle?: string;
  colSpan?: number;
  hasPagination?: boolean;
 }

const StyledTable = ({ test, headCells, children, tableTitle, colSpan, hasPagination = true }: IStyledTable) => {
  console.log('test', test);

  return (
    <>
      <StyledTableContainer>
        <StyledMuiTable>
          <TableHead>
            <StyledTableRow>
              {
                tableTitle ? <TableCell colSpan={colSpan}>{tableTitle}</TableCell>
                  : (headCells ? headCells.map(({ label, sx }) => (
                    <TableCell key={label} sx={sx}>{label}</TableCell>
                  )) : null)
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
