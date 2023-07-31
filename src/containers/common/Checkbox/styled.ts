import styled from '@emotion/styled';
import MuiCheckbox from '@mui/material/Checkbox';

// import UncheckedCheckbox from '../Icons/UncheckedCheckbox';

// export const StyledUncheckedCheckbox = styled(UncheckedCheckbox)(({ theme }) => ({
//   'input:hover ~ &': {
//     backgroundColor: theme.palette.grey['400'],
//   },
//   'input:disabled ~ &': {
//     backgroundColor: theme.palette.grey['200'],
//   },
// }));

export const StyledMuiCheckbox = styled(MuiCheckbox)(() => ({
  svg: {
    fontSize: '10px',
  },

  ':hover': {
    svg: {
      // rect: {
      //   fill: theme.palette.primary.dark,
      // },
    },
  },
}));
