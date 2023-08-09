import { Dispatch, SetStateAction, SyntheticEvent, forwardRef, memo } from 'react';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertColor, AlertProps } from '@mui/material/Alert';

const Alert = forwardRef<HTMLDivElement, AlertProps>((
  props,
  ref,
) => {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface IStyledSnackbar {
  type?: AlertColor;
  message: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const StyledSnackbar = ({ type = 'success', message, open, setOpen }:IStyledSnackbar) => {
  const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={type}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default memo(StyledSnackbar);
