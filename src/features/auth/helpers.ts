import { ISignInResponseType } from '@features/auth/types';
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@utils/constants';
import StorageManager from '@utils/storage-manager';

export const setLocalStorageData = ({
  accessToken,
  refreshToken,
}: ISignInResponseType) => {
  StorageManager.setItem(ACCESS_TOKEN_KEY, accessToken);
  StorageManager.setItem(REFRESH_TOKEN_KEY, refreshToken);
};

export const clearLocalStorageData = () => {
  StorageManager.removeItem(ACCESS_TOKEN_KEY);
  StorageManager.removeItem(REFRESH_TOKEN_KEY);
};

export const getAccessToken = (): string | null => {
  const token = StorageManager.getItem(ACCESS_TOKEN_KEY);

  return token || null;
};
