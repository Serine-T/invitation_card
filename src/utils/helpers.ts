import { ISignInResponseType } from '../models/auth-model';
import {
  AMAZON_S3_CDN_URL,
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN,
} from './constants';
import StorageManager from './storage-manager';

export const sleep = (delay = 0) =>
  new Promise((resolve) => {
    setTimeout(resolve, delay);
  });

export const getCDNImagePath = (path: string) => `${AMAZON_S3_CDN_URL}/${path}`;

export const camelCaseToSensativeCase = (text: string): string => {
  const result = text.replace(/([A-Z])/g, ' $1');
  const finalResult = result.charAt(0).toUpperCase() + result.slice(1);

  return finalResult;
};

export const replceSpacingWithUnderscore = (text: string): string => {
  const trimedText = text?.trim().replace(/\s+/g, '_').toLowerCase();

  return `${trimedText}_${Date.now()}`;
};

export const formatPhoneNumber = (
  phoneNumberString: number | string,
): string => {
  const cleaned = `${phoneNumberString}`.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }

  return '';
};

export const setLocaleStorageData = ({
  accessToken,
  refreshToken,
}: ISignInResponseType) => {
  StorageManager.setItem(ACCESS_TOKEN_KEY, accessToken);
  StorageManager.setItem(REFRESH_TOKEN, refreshToken);
};

// Add leading 0 if number has only one digit
export const addZeroToOneDigit = (num: number) => {
  return String(num).padStart(2, '0');
};
