import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

export const StyledBox = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  width: '100%',
  position: 'absolute',
  background: 'rgba(255, 255, 255, .8)',
  zIndex: 9000,
}));

export const StyledOverlay = styled(Box)(() => ({
  position: 'fixed',
  zIndex: 11000,
  top: '50%',
  left: ' 50%',
  transform: 'translate(-50%, -50%)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));
