import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

export const StyledBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isLayout',
})<{isLayout: boolean}>(({ isLayout }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: isLayout ? 'calc(100vh - 120px)' : '100vh',
  width: '100%',
  position: isLayout ? 'relative' : 'absolute',
  background: 'rgba(255, 255, 255, .8)',
  zIndex: 9000,
}));

export const StyledOverlay = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isLayout',
})<{isLayout: boolean}>(({ isLayout }) => ({
  position: isLayout ? 'absolute' : 'fixed',
  zIndex: 11000,
  top: '50%',
  left: ' 50%',
  transform: 'translate(-50%, -50%)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));
