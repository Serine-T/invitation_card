import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

export const StyledUploadContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'uploadedImg',
})<{uploadedImg?: boolean}>(({ theme, uploadedImg = false }) => ({
  padding: '8px',
  display: 'flex',
  border: `1px ${uploadedImg ? 'solid' : 'dashed'} ${theme.palette.grey[500]}`,
  borderRadius: '4px',
  height: '90px',
  justifyContent: uploadedImg ? 'flex-start' : 'center',
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
  display: 'flex',
  flexWrap: 'wrap',
  columnGap: '8px',
}));
