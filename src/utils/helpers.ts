import {
  AMAZON_S3_CDN_URL,
} from './constants';

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

// Add leading 0 if number has only one digit
export const addZeroToOneDigit = (num: number) => {
  return String(num).padStart(2, '0');
};
