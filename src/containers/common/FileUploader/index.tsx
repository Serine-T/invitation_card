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

import { FileStateType, getUploadUrl, uploadFile } from './helpers';
import { StyledEmptyContainer, StyledImgContainer, StyledTitleBox, StyledUploadContainer } from './styles';

interface IImageUpload {
  name: string;
}

const ImageUpload = ({ name }: IImageUpload) => {
  const [loading, setLoading] = useState(false);
  const { setValue, watch } = useFormContext();
  const uploadedImg = watch('img');
  const [fileData, setFileData] = useState<File | null>(null);

  // TODO: use this function

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const uploadToS3 = async (file: FileStateType) => {
    try {
      setLoading(true);

      const { img, url } = await getUploadUrl();

      await uploadFile({ file: file as File, url });

      setValue(name, img);
      setFileData(file as File);
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
        accept=".jpg, .jpeg, .png"
        style={{ display: 'none' }}
        onChange={handleChange}
      />
      {
        (uploadedImg && fileData) ? (
          <StyledUploadContainer>
            <StyledImgContainer>
              <img src={getCDNImagePath(uploadedImg)} alt="" />
            </StyledImgContainer>
            {/* TODO: check format of file size  */}
            <StyledTitleBox>
              <StyledEllipsisText variant="body3">
                {fileData?.name}
              </StyledEllipsisText>
              <StyledTypography variant="body3" color="grey" minWidth="65px">
                {`${(fileData.size / 1024).toFixed(2)} KB`}
              </StyledTypography>
            </StyledTitleBox>
            <StyledTypography cursor onClick={handleDeleteImg}>
              <CloseIcon fontSize="inherit" color="inherit" />
            </StyledTypography>
          </StyledUploadContainer>
        ) : (
          <StyledEmptyContainer>
            <Typography variant="body3">Drag and drop files or </Typography>
            <StyledTypography variant="body3" color="blue" m="0 16px 0 4px" cursor>
              Browse
            </StyledTypography>
            <UploadIcon />
          </StyledEmptyContainer>
        )
      }
    </Box>
  );
};

export default ImageUpload;
