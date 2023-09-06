import {
  AMAZON_S3_CDN_URL,
} from './constants';
import { ISelectOptions } from './types';

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

interface IItems {
  id: string;
  [key: string]: any;
}

export const getReorderedArray = (items: IItems[]) => {
  const orders = items.map(({ id }, index) => ({ id, sort: index + 1 }));

  return { orders };
};

export const getOptionsArray = (
  items: IItems[],
  fieldName?: string,
): ISelectOptions[] => {
  return items.map((item) => ({
    value: item.id,
    optionName: fieldName ? item[fieldName] : undefined,
  }));
};

interface Filters {
  [key: string]: string | undefined;
}

export const constructQueryString = (filters: Filters): string => {
  return Object.entries(filters)
    .map(([key, value]) => value && `${key}=${value}`)
    .filter(Boolean)
    .join('&');
};
