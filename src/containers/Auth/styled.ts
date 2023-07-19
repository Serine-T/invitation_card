import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import StyledTypography from '@containers/common/StyledTypography';

export const StyledSection = styled(Box)(() => ({
  width: '100%',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
}));

export const StyledContainer = styled(Box)(() => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  maxWidth: 264,
}));

export const StyledBox = styled(Box)(({ theme }) => ({
  padding: '24px 32px',
  border: `1px solid ${theme.palette.grey[500]}`,
  borderRadius: '10px',
}));

export const StyledLogoBox = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  marginBottom: 40,

  img: {
    width: 200,
    objectFit: 'contain',
  },
}));

export const StyledInputBox = styled(Box)(() => ({
  marginBottom: '24px',
}));

export const StyledTitle = styled(Typography)(() => ({
  marginBottom: '24px',
}));

export const StyledForgetBox = styled(Box)(() => ({
  textAlign: 'center',
}));

export const StyledForgetText = styled(StyledTypography)(() => ({
  paddingLeft: '3px',
  textAlign: 'center',
  cursor: 'pointer',

  '&:hover': {
    textDecoration: 'underline',
  },
}));
