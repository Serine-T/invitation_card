export interface IUserState {
  isLoading: boolean;
  data: IUserInfo[];
  actionLoading: boolean;
}

export enum Permissions {
  PRODUCTION = 'production',
  SOCIAL = 'social',
  USER_MANAGEMENT = 'user_management'
}

export interface IAddUserPayload {
  id?: string;
  email: string;
  password?: string;
  username: string;
  firstName: string;
  lastName: string;
  permissions: Permissions[];
}

export interface Permission {
  id: string;
  created: string;
  updated: string;
  deleted: string;
  title: string;
  user: string;
}
export interface IUserInfo {
  id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  isVerified: boolean;
  permissions: Permission[];
}
