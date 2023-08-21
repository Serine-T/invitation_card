// TODO: Delete after testing
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
// TODO: View requests
export type FileStateType = File | null; // FileList |
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

export const getUploadUrl = async ({ fileName } : {fileName: string}) => {
  try {
    const idx = fileName.lastIndexOf('.');

    const name = fileName.substring(0, idx);
    const extension = fileName.substring(idx + 1);
    const { data } = await http.get<
      ICreateAWSLinkResponse>(`${AWS_S3_PREFIX}?extension=${extension}&name=${name}`);

    return { url: data?.putUrl || '', img: data?.path || '' };
  } catch (error) {
    throw error;
  }
};
