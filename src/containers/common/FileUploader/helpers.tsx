// TODO: Delete after testing
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

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
};
