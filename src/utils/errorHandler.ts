import { errorMessages } from './errorMessages';
import { ErrorType } from './types';

export const customErrorHandling = (error: any): ErrorType => {
  const errorMainInfo = error?.data;
  let message = errorMainInfo?.message as string;

  if (message in errorMessages) {
    message = errorMessages[message];
  }

  return { ...errorMainInfo, message } as ErrorType;
};
