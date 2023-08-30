import { ChangeEvent, DragEvent, useState } from 'react';

import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useFormContext } from 'react-hook-form';
import StyledTypography from '@containers/common/StyledTypography';
import UploadIcon from '@containers/common/Icons/UploadIcon';
import { getCDNImagePath } from '@utils/helpers';
import { StyledEllipsisText } from '@containers/common/EllipsisText/styled';
import CloseIcon from '@mui/icons-material/Close';

import { FileStateType, getUploadUrl, uploadFile } from './requests';
import { StyledEmptyContainer, StyledImgContainer, StyledTitleBox, StyledUploadContainer } from './styles';
import ErrorMessage from '../ErrorMessage';
import { acceptedExtensions } from './helpers';

interface IImageUpload {
  name: string;
  errorMessage?: string;
  width?:number;
}

const ImageUpload = ({ name, errorMessage, width }: IImageUpload) => {
  const [loading, setLoading] = useState(false);
  const { setValue, watch } = useFormContext();
  const uploadedImg = watch(name);

  const [fileData, setFileData] = useState<File | null>(null);

  const uploadToS3 = async (file: FileStateType) => {
    try {
      setLoading(true);
      if (file) {
        console.log('widddtttt****', width);
        // if (width) {
        //   const img = new Image();

        //   img.onload = async () => {
        //     if (img.width !== width) {
        //       // Handle the width error (e.g., show an error message)
        //       console.error('The image width exceeds 500px');
        //     }
        //   };
        // }

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
              <StyledEllipsisText variant="body3">
                {fileData?.name}
              </StyledEllipsisText>
              )}
              {fileData && (
              <StyledTypography variant="body3" color="grey" minWidth="65px">
                {`${(fileData.size / 1024).toFixed(2)} KB`}
              </StyledTypography>
              )}
            </StyledTitleBox>

            <StyledTypography cursor="pointer" onClick={handleDeleteImg}>
              <CloseIcon fontSize="inherit" color="inherit" />
            </StyledTypography>
          </StyledUploadContainer>
        ) : (
          <StyledEmptyContainer error={!!errorMessage}>
            <Typography variant="body3">Drag and drop files or </Typography>
            <StyledTypography variant="body3" color="blue" m="0 16px 0 4px">
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
