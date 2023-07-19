import { ButtonProps } from '@mui/material/Button';
import UploadIcon from '@assets/svgs/upload-icon.svg';

import { StyledButton } from './styled';

interface IUploadButtonProps extends ButtonProps {}

const UploadButton = ({ title = 'Choose image', ...restProps }: IUploadButtonProps) => {
  // TODO: check if upload icon is necessary
  return (
    <StyledButton
      component="div"
      color="inherit"
      variant="contained"
      endIcon={<UploadIcon />}
      {...restProps}
    >
      {title}
    </StyledButton>
  );
};

export default UploadButton;
