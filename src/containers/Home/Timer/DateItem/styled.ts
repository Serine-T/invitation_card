import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import StyledTypography from '@containers/common/StyledTypography';

export const StyledDivider = styled(Divider)(({ theme }) => ({
  borderWidth: 1,
  borderColor: theme.palette.primary.dark,
}));

export const StyledText = styled(StyledTypography)(({ theme }) => ({

  [theme.breakpoints.down('sm')]: {
    fontSize: '24px',
  },
  [theme.breakpoints.down('xs')]: {
    fontSize: '16px',
  },
}));
