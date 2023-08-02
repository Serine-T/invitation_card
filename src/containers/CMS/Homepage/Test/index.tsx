import { ChangeEvent, useCallback, useEffect, useState } from 'react';

import Upload from '@containers/common/Upload';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import CircularProgress from '@mui/material/CircularProgress';

import { StyledImgContainer, StyledUploadContainer } from './styles';

export interface ICreateAWSLinkResponse {
  putUrl: string;
  path: string;
}

export interface IUploadFileProps {
  file: File;
  url: string;
}

type FileStateType = FileList | File | null;
export const uploadFile = async ({ file, url }: IUploadFileProps) => {
  const options: AxiosRequestConfig = {
    headers: { 'Content-Type': 'application/octet-stream' },
    withCredentials: false,
  };

  try {
    const response = await axios.put<IUploadFileProps['file'], boolean>(url, file, options);

    return response;
  } catch (error) {
    throw error;
  }
};

export const getUploadUrl = async () => {
  try {
    const {
      data: { data },
    } = await axios.get<AxiosResponse<ICreateAWSLinkResponse>>(
      'https://agora.server.brainstormtech.io/api_v2/s3/url?extension=png',
    );

    return { url: data?.putUrl || '', img: data?.path || '' };
  } catch (error) {
    throw error;
  }

//   return { url: data?.putUrl || '', img: data?.path || '' };
};

const Test = () => {
  // TODO: HOMEPAGE DELETE AFTER TESTING
  const [fileData, setFileData] = useState<FileStateType>(null);
  const [isUploadeing, setIsUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState('');

  console.log('imagePreview', imagePreview);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const currentFiles = e.target.files;

    console.log('handleChange');

    if (currentFiles) {
      setFileData(currentFiles[0]);
    }
  };

  const uploadToS3 = useCallback(
    async (file: FileStateType) => {
      setIsUploading(true);
      try {
        const { img, url } = await getUploadUrl();

        await uploadFile({ file: file as File, url });

        setImagePreview(img);
      } finally {
        setIsUploading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setImagePreview],
  );

  useEffect(() => {
    if (fileData) {
      uploadToS3(fileData);
    }
  }, [fileData, uploadToS3]);
  if (isUploadeing) {
    return <CircularProgress size="20px" color="primary" />;
  }

  return (
    <StyledUploadContainer>
      {/* <img src={`https://gohealthy.s3.amazonaws.com/${imagePreview}`} alt="img" /> */}
      <StyledImgContainer>
        <img
          // eslint-disable-next-line max-len
          src="https://images.ctfassets.net/nwksj2ft7iku/bo5sWgkQrbyfMNX1jk3jd/4caeecf66ca005164236d132986cdace/FAQ_768x480.png"
          alt="test"
        />
      </StyledImgContainer>

      <Upload name="photo" onChange={handleChange} id="test">test</Upload>
    </StyledUploadContainer>
  );
};

export default Test;
