import { styled } from '@mui/material/styles';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Pagination from '@mui/material/Pagination';
import Table from '@mui/material/Table';
import { FontFamilyNames } from '@customTypes/global/theme/fonts';

export const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  boxShadow: 'none',
  border: `1px solid ${theme.palette.grey[500]}`,
  borderRadius: 0,
  overflowX: 'auto',
  width: '100%',
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  th: {
    background: theme.palette.grey[700],
    textTransform: 'uppercase',
    fontWeight: 500,
    fontFamily: FontFamilyNames.DmSansMedium,
  },
  'td, th': {
    borderRight: `1px solid ${theme.palette.grey[500]}`,
    fontSize: '12px',
    padding: '20px 16px',
  },
  'th:last-child, td:last-child': {
    borderRight: 0,
  },

  '&:last-child td': {
    borderBottom: 0,
  },
}));

export const StyledMuiTable = styled(Table)(() => ({
  boxShadow: 'none',
  minWidth: '432px',
}));

export const StyledPagination = styled(Pagination)(({ theme }) => ({
  margin: '72px auto 0',
  display: 'flex',
  justifyContent: 'center',

  '.MuiPaginationItem-root': {
    borderRadius: '8px',
    fontSize: '14px',
    margin: '0 8px',
    '&.Mui-selected': {
      background: theme.palette.grey[500],

      '&:hover': {
        background: theme.palette.grey[500],
      },
    },

    '&:hover': {
      background: theme.palette.grey[500],
    },
  },
}));
