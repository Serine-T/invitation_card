import { http } from '@services/RequestService';
import { AWS_S3_PREFIX } from '@utils/constants';
import axios, { AxiosRequestConfig } from 'axios';

export interface IUploadFileProps {
  file: File;
  url: string;
}

export interface ICreateAWSLinkResponse {
  putUrl: string;
  path: string;
}

export type FileStateType = File | null; // FileList |
export const uploadFile = async ({ file, url }: IUploadFileProps) => {
  const options: AxiosRequestConfig = {
    headers: { 'Content-Type': 'application/octet-stream' },
    withCredentials: false,
  };

  // eslint-disable-next-line max-len
  // const test = 'https://postcards-dev.s3.amazonaws.com/images/test-aaba6881-c768-4cbf-a234-44d1f46c1a25.jpeg?Content-Type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA4552PZX4I2RYQH43%2F20230908%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230908T071543Z&X-Amz-Expires=900&X-Amz-Signature=4845b4c9a029eb45d1522cdb87ea24e7d1c081e5a12e75bfdc22d20964891213&X-Amz-SignedHeaders=host';

  const response = await axios.put<IUploadFileProps['file'], boolean>(url, file, options);

  return response;
};

export const getUploadUrl = async ({ fileName } : {fileName: string}) => {
  const idx = fileName.lastIndexOf('.');

  const name = fileName.substring(0, idx);
  const extension = fileName.substring(idx + 1);
  const { data } = await http.get<ICreateAWSLinkResponse>(
    `${AWS_S3_PREFIX}?extension=${extension}&name=${name}`,
  );

  return { url: data?.putUrl || '', img: data?.path || '' };
};
