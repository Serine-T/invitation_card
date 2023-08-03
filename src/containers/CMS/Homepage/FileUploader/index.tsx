import { ChangeEvent, DragEvent, useState } from 'react';

import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useFormContext } from 'react-hook-form';
import StyledTypography from '@containers/common/StyledTypography';
import UploadIcon from '@containers/common/Icons/UploadIcon';
import { getCDNImagePath } from '@utils/helpers';
import { StyledEllipsisText } from '@containers/common/EllipsisText/styled';

import { FileStateType, getUploadUrl, uploadFile } from './helpers';
import { StyledImgContainer, StyledTitleBox, StyledUploadContainer } from './styles';

interface IImageUpload {
  name: string;
}

const ImageUpload = ({ name }: IImageUpload) => {
  const [loading, setLoading] = useState(false);
  const { setValue, watch } = useFormContext();
  const uploadedImg = watch('img');
  const [fileData, setFileData] = useState<File | null>(null);

  const uploadToS3 = async (file: FileStateType) => {
    try {
      const { img, url } = await getUploadUrl();

      await uploadFile({ file: file as File, url });

      setValue(name, img);
      setFileData(file as File);
      console.log('file', file);
    } catch {}
  };

  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      await uploadToS3(file);
    }
  };

  const handleDrop = async (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setLoading(true);

    const file = event.dataTransfer.files[0] as any;

    if (file) {
      await uploadToS3(file);
    }

    setLoading(false);
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

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
      {loading ? (
        <StyledUploadContainer>
          <CircularProgress size="20px" color="primary" />
        </StyledUploadContainer>
      ) : (
        (uploadedImg && fileData) ? (
          <StyledUploadContainer uploadedImg>
            <StyledImgContainer>
              <img src={getCDNImagePath(uploadedImg)} alt="" />
            </StyledImgContainer>
            {/* TODO: check format of file size  */}
            <StyledTitleBox>
              <StyledEllipsisText variant="body3">{fileData?.name}</StyledEllipsisText>
              <StyledTypography variant="body3" color="grey">
                {`${(fileData.size / 1024).toFixed(2)} KB`}
              </StyledTypography>
            </StyledTitleBox>
          </StyledUploadContainer>
        ) : (
          <StyledUploadContainer>
            <Typography variant="body3">Drag and drop files or </Typography>
            <StyledTypography variant="body3" color="blue" m="0 16px 0 4px">Browse</StyledTypography>
            <UploadIcon />
          </StyledUploadContainer>
        )
      )}
    </Box>
  );
};

export default ImageUpload;
