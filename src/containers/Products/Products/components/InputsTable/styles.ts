import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

export const StyledDivider = styled(Box)(({ theme }) => ({
  position: 'relative',

  '&::after': {
    content: '""',
    position: 'absolute',
    width: 'calc(100% + 230px)',
    height: '1px',
    background: theme.palette.divider,
    left: '-230px',
    [theme.breakpoints.down('lg')]: {
      width: '100%',
      left: 0,
    },
  },
}));

export const StyledTabs = styled(Tabs)(() => ({
  '.MuiTabs-flexContainer': {
    justifyContent: 'space-between',
  },
}));

export const StyledTab = styled(Tab)(() => ({
  textTransform: 'capitalize',
}));
