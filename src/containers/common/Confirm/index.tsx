import Typography from '@mui/material/Typography';
import { ConfirmOptions } from 'material-ui-confirm';

import Button from '../Button';

interface IconfirmOptionsDialog {
  questionText: string;
}

const confirmOptionsDialog = ({ questionText }: IconfirmOptionsDialog): ConfirmOptions => {
  return {
    title: '',
    content: (
      <Typography variant="subtitle2" align="center">
        {questionText}
      </Typography>
    ),
    dialogProps: {
      maxWidth: 'xs',
      fullWidth: true,
      BackdropProps: {
        style: {
          backgroundColor: '#06152B40',
        },
      },
      PaperProps: {
        sx: {
          maxWidth: '308px',
          padding: '40px 32px 32px',
          margin: 0,
          borderRadius: '10px',
          '.MuiDialogContent-root': {
            padding: 0,
            marginBottom: '32px',
          },
          '.MuiDialogActions-root': {
            display: 'flex',
            padding: 0,
            justifyContent: 'center',
            button: {
              width: '120px',
              padding: 0,
            },
          },
        },
      },
    },
    cancellationText: <Button isOutlined>Cancel</Button>,
    confirmationText: <Button>Yes</Button>,
  };
};

export default confirmOptionsDialog;
