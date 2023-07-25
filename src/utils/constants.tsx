export const DRAWER_WIDTH = 256;

export enum ACTION_STATUSES {
  HOLD = 0,
  PENDING = 1,
  SUCCEED = 2,
  FAILED = 3,
}

export const APP_CONFIG = {
  NAME: 'Vendo',
  ENV: process.env.NODE_ENV,
  LOCALE: 'en-GB',
};

export const ACCESS_TOKEN_KEY = 'access_token';
export const REFRESH_TOKEN_KEY = 'refresh_token';
export const USER_KEY = 'user';

const AWS_S3_BUCKET_NAME: string = process.env.REACT_APP_S3_BUCKET_NAME || 'agora-dev';

export const AMAZON_S3_CDN_URL = `https://${AWS_S3_BUCKET_NAME}.s3.amazonaws.com`;
export const AWS_S3_PREFIX: string = '/s3/url';
export const STAGING_URL =
  process.env.REACT_APP_S3_BUCKET_NAME === 'vendofr' ? 'https://vendo.am' : 'https://agora.server.brainstormtech.io';
