import { ChangeEvent, DragEvent, useState } from 'react';

import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useFormContext } from 'react-hook-form';
import StyledTypography from '@containers/common/StyledTypography';
import UploadIcon from '@containers/common/Icons/UploadIcon';
import { getCDNImagePath } from '@utils/helpers';
import EllipsisText from '@containers/common/EllipsisText';
import CloseIcon from '@mui/icons-material/Close';

import { FileStateType, getUploadUrl, uploadFile } from './requests';
import { StyledEmptyContainer, StyledImgContainer, StyledTitleBox, StyledUploadContainer } from './styles';
import ErrorMessage from '../ErrorMessage';
import { fileExtensions, imgExtensions } from './helpers';

interface IImageUpload {
  name: string;
  errorMessage?: string;
  isFile?: boolean;
}

const ImageUpload = ({ name, errorMessage, isFile = false }: IImageUpload) => {
  const acceptedExtensions = isFile ? fileExtensions : imgExtensions;
  const [loading, setLoading] = useState(false);
  const { setValue, watch } = useFormContext();
  const uploadedImg = watch(name);

  const [fileData, setFileData] = useState<File | null>(null);

  const uploadToS3 = async (file: FileStateType) => {
    try {
      setLoading(true);
      if (file) {
        const { img, url } = await getUploadUrl({ fileName: file.name });

        await uploadFile({ file: file as File, url });
        setValue(name, img, { shouldValidate: true });
        setFileData(file as File);
      }
    } catch { } finally {
      setLoading(false);
    }
  };

  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      await uploadToS3(file);
    }
  };

  const handleDrop = async (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    const file = event.dataTransfer.files[0] as any;
    const fileExtension = `.${file.name.split('.').pop()}`;

    if (!acceptedExtensions.includes(fileExtension.toLowerCase())) {
      return;
    }

    if (file) {
      await uploadToS3(file);
    }
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDeleteImg = (event: any) => {
    event.preventDefault();
    event.stopPropagation();

    setFileData(null);
    setValue(name, null, { shouldValidate: true });
  };

  if (loading) {
    return (
      <StyledEmptyContainer>
        <CircularProgress size="20px" color="primary" />
      </StyledEmptyContainer>
    );
  }

  return (
    <Box
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      component="label"
      id="fileInput"
    >
      <input
        id="fileInput"
        type="file"
        accept={acceptedExtensions.join(', ')}
        style={{ display: 'none' }}
        onChange={handleChange}
      />
      {
        uploadedImg ? (
          <StyledUploadContainer error={!!errorMessage}>
            <StyledImgContainer>
              <img src={getCDNImagePath(uploadedImg)} alt="" />
            </StyledImgContainer>
            {/* TODO: check format of file size  */}

            <StyledTitleBox>
              { fileData && (
              <EllipsisText variant="body3" width={210} line={2}>
                {fileData?.name}
              </EllipsisText>
              )}
              {fileData && (
              <StyledTypography variant="body3" color="grey" minWidth="65px">
                {`${(fileData.size / 1024).toFixed(2)} KB`}
              </StyledTypography>
              )}
            </StyledTitleBox>

            <Box>
              <StyledTypography cursor="pointer" onClick={handleDeleteImg}>
                <CloseIcon fontSize="inherit" color="inherit" />
              </StyledTypography>
            </Box>

          </StyledUploadContainer>
        ) : (
          <StyledEmptyContainer error={!!errorMessage}>
            <Typography variant="body3">Drag and drop files or </Typography>
            <StyledTypography variant="body3" color="blue" m="0 16px 0 4px" underLine>
              Browse
            </StyledTypography>
            <UploadIcon />
          </StyledEmptyContainer>
        )
      }
      {!!errorMessage && <ErrorMessage message={errorMessage} />}
    </Box>
  );
};

export default ImageUpload;
