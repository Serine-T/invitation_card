export interface IState {
  isLoading: boolean;
  banners: IBannerInfo[];
  sliders: IBannerInfo[];
  actionLoading: boolean;
  errorMessage: null | string;
}

export enum BannerCategoryEnum {
  banner= 'banner',
  slider= 'slider',
}

export interface IAddBannerPayload {
  id?: string;
  title: string;
  description: string;
  desktopPhoto: string;
  mobilePhoto: string;
  backgroundColor: string;
  firstButtonName?: string;
  firstButtonLink?: string;
  secondButtonName?: string;
  secondButtonLink?: string;
  category?: BannerCategoryEnum;
  displayOnSite?: boolean;
}

export interface IBannerInfo {
  id: string;
  title: string;
  description: string;
  desktopPhoto: string;
  mobilePhoto: string;
  backgroundColor: string;
  firstButtonName?: string;
  firstButtonLink?: string;
  secondButtonName?: string;
  secondButtonLink?: string;
  category?: BannerCategoryEnum;
  displayOnSite?: boolean;
}

export interface IBanners {
  banners: IBannerInfo[];
  sliders: IBannerInfo[];
}
