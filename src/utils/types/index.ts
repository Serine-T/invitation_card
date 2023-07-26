export type BaseAction<T = any> = {
  type: string;
  payload?: T;
};

export type PayloadAction<T = any> = {
  type: string;
  payload: T;
};

export interface IPagination {
  offset: number;
  limit: number;
  total: number;
}

export interface ResponseData<T> {
  data: T;
  meta: {
    pagination: IPagination;
  };
}
export type SortType = {
  id: string;
  sort: number;
}

export interface SortPayload {
  data: SortType[];
}

export interface ResponsePagination<T> {
  data: T;
  meta: {
    pagination: IPagination;
  };
}

export type Order = 'asc' | 'desc';

// TODO: test above code if they aren't used delete them

export enum REQUEST_STATUS {
  SUCCEED = 'SUCCEED',
  FAILED = 'FAILED'
}

export type ErrorType = {
  error: string;
  message: string;
  statusCode: number;
}
