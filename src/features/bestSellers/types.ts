export interface IState {
  isLoading: boolean;
  data: IBestSellerInfo[];
  actionLoading: boolean;
  errorMessage: null | string;
}

export interface IAddBestSellerPayload {
  id?: string;
  title: string;
  description: string;
  desktopPhoto: string;
  mobilePhoto: string;
  displayOnSite: boolean;
  subCategory: string;
}

export interface IBestSellerInfo {
  id: string;
  created: string;
  updated: string;
  deleted: any;
  title: string;
  description: string;
  sort: number;
  displayOnSite: boolean;
  desktopPhoto: string;
  mobilePhoto: string;
  subCategory: string;
}
