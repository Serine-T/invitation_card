import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

export const StyledTitleBox = styled(Box)(() => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: '28px',
  height: 'calc(100vh - 240px)',

  '.MuiTypography-root': {
    maxWidth: '600px',
    textAlign: 'center',
  },
}));
