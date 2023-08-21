import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

const reusableStyles = {
  padding: '8px',
  borderRadius: '4px',
  cursor: 'pointer',
  minHeight: '90px',
};

export const StyledUploadContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'error',
})<{ error?: boolean }>(({ theme, error }) => ({
  ...reusableStyles,
  display: 'grid',
  gridTemplateColumns: '74px 1fr 20px',
  border: `1px solid ${error ? theme.palette.error.dark : theme.palette.grey[500]}`,
  gridColumnGap: '16px',
  alignItems: 'center',
}));

export const StyledEmptyContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'error',
})<{ error?: boolean }>(({ theme, error }) => ({
  ...reusableStyles,
  display: 'flex',
  border: `1px dashed ${error ? theme.palette.error.dark : theme.palette.grey[500]}`,
  justifyContent: 'center',
  alignItems: 'center',
  flexWrap: 'wrap',
}));

export const StyledImgContainer = styled(Box)(() => ({
  width: 74,
  minWidth: '74px',
  height: 74,

  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
}));
export const StyledTitleBox = styled(Box)(() => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  columnGap: '8px',
}));
