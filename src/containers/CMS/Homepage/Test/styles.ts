import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';

export const StyledUploadContainer = styled(Stack)(({ theme }) => ({
  padding: '8px',
  display: 'flex',
  border: `1px solid ${theme.palette.grey[500]}`,
  borderRadius: '4px',
}));
export const StyledImgContainer = styled(Stack)(() => ({
  width: 74,
  height: 74,

  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },

}));
