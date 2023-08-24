import { AxiosResponse } from 'axios';

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

export enum InputTypes {
  text = 'text',
  textarea = 'textarea',
  checkbox = 'checkbox',
  select = 'select',
  image = 'image',
  colorPicker ='colorPicker'
}

export type ValidFieldNames = {
  label: string;
  field:string;
  type: InputTypes;
}

export type AxiosData = AxiosResponse['data']
export enum REQUEST_STATUS {
  SUCCEED = 'SUCCEED',
  FAILED = 'FAILED'
}

export type ErrorType = {
  error: string;
  message: string;
  statusCode: number;
}

export interface IReordering {
    id: string;
    sort: number;
}
export interface IReorderPayload {
  orders: IReordering[];
}

export interface SelectOptions {
  optionName: string;
  value: string | number;
}
