import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

export const StyledUploadContainer = styled(Box)(({ theme }) => ({
  padding: '8px',
  display: 'grid',
  gridTemplateColumns: '74px 1fr 20px',
  border: `1px solid ${theme.palette.grey[500]}`,
  gridColumnGap: '8px',
  borderRadius: '4px',
  height: '90px',
  alignItems: 'center',
}));

export const StyledEmptyContainer = styled(Box)(({ theme }) => ({
  height: '90px',
  padding: '8px',
  display: 'flex',
  border: `1px dashed ${theme.palette.grey[500]}`,
  borderRadius: '4px',
  justifyContent: 'center',
  alignItems: 'center',
}));

export const StyledImgContainer = styled(Box)(() => ({
  width: 74,
  minWidth: '74px',
  height: 74,
  marginRight: '16px',

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
