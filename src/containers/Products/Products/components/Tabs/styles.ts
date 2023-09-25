import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

export const StyledDivider = styled(Box)(({ theme }) => ({
  marginBottom: '40px',

  '&::after': {
    content: '""',
    position: 'absolute',
    width: 'calc(100% + 220px)',
    height: '1px',
    background: theme.palette.divider,
    left: '-220px',

    [theme.breakpoints.down('lg')]: {
      width: '100%',
      left: 0,
    },
  },
}));

export const StyledTabs = styled(Tabs)(({ theme }) => ({
  '.MuiTabs-flexContainer': {
    justifyContent: 'space-between',

    [theme.breakpoints.down('lg')]: {
      justifyContent: 'flex-start',
      flexWrap: 'wrap',
    },
  },
}));

export const StyledTab = styled(Tab)(({ theme }) => ({
  width: '165px',
  textTransform: 'capitalize',
  color: theme.palette.grey[600],
}));
