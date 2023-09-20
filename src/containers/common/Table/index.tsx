import { ReactNode, memo } from 'react';

import { TableProps } from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import { Stack, Typography } from '@mui/material';

import { StyledMuiTable, StyledPagination, StyledTableContainer, StyledTableRow } from './styled';
import { ITableHeadCell } from './helpers';

interface IStyledTable extends TableProps {
  headCells?: ITableHeadCell[];
  children: ReactNode;
  tableTitle?: string;
  colSpan?: number;
  hasPagination?: boolean;
  btn?: ReactNode | null;
 }

const StyledTable = ({
  headCells, children, tableTitle, colSpan, hasPagination = false, btn = null,
}: IStyledTable) => {
  return (
    <>
      <StyledTableContainer>
        <StyledMuiTable>
          <TableHead>
            <StyledTableRow>
              {
                tableTitle ? (
                  <TableCell colSpan={colSpan}>
                    <Stack direction="row" justifyContent="space-between">
                      <Typography>
                        {tableTitle}
                      </Typography>
                      {btn && btn}
                    </Stack>
                  </TableCell>
                )
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
