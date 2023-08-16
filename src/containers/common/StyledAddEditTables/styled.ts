import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Button from '@containers/common/Button';
import TableCell from '@mui/material/TableCell';
import { FontFamilyNames } from '@customTypes/global/theme/fonts';

export const StyledStack = styled(Stack)<{component?: string}>(({ theme }) => ({
  width: '660px',

  [theme.breakpoints.down('lg')]: {
    maxWidth: 'calc(100vw - 64px)',
  },
}));

export const StyledButton = styled(Button)(() => ({
  marginTop: '40px',
}));

export const StyledTableCell = styled(TableCell)(() => ({
  width: '232px',
  fontWeight: 500,
  fontFamily: FontFamilyNames.DmSansMedium,
}));
