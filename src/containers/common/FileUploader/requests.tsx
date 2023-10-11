import { http } from '@services/RequestService';
import { AWS_S3_PREFIX } from '@utils/constants';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import { getMimeType } from './helpers';

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
  const mimeType = getMimeType(file.name);

  const options: AxiosRequestConfig = {
    headers: { 'Content-Type': mimeType },
    withCredentials: false,
  };

  const response = await axios.put<IUploadFileProps['file'], boolean>(url, file, options);

  return response;
};

export const getUploadUrl = async ({ fileName } : {fileName: string}) => {
  const idx = fileName.lastIndexOf('.');

  const name = fileName.substring(0, idx);
  const extension = fileName.substring(idx + 1);
  const { data: { data } } = await http.get<AxiosResponse<ICreateAWSLinkResponse>>(
    `${AWS_S3_PREFIX}?extension=${extension}&name=${name}`,
  );

  return { url: data?.putUrl || '', img: data?.path || '' };
};
