import { DefaultInkInEstimator, PrintType, StaticShippingFacility } from './enums';

export interface IState {
  isLoading: boolean;
  data: ISubcategoriesInfo[];
  actionLoading: boolean;
  errorMessage: null | string;
}

export interface IAddSubcategoriesPayload {
  id?: string;
  title: string;
  description: string;
  photo: string;
  categoryId: string | null;
  printType: PrintType | null;
  isNew: boolean;
  isSale: boolean;
  useGrandFormatSQFtTemplate: boolean;
  defaultInkInEstimator: DefaultInkInEstimator | null;
  visibleOnSite: boolean;
  displayAsCardInHeader: boolean;
  categoryDiscountOffMSRP: number | null;
  metaTagTitle: string;
  metaTagDescription: string;
  metaTagKeywords: string;
  staticShippingFacility?: StaticShippingFacility[];
}

export interface ISubcategoriesInfo {
  id: string;
  created: string;
  updated: any;
  deleted: any;
  title: string;
  description: string;
  sort: number;
  photo: string;
  categoryDiscountOffMSRP: number;
  defaultInkInEstimator: DefaultInkInEstimator | null;
  staticShippingFacility: StaticShippingFacility[];
  useGrandFormatSQFtTemplate: boolean;
  visibleOnSite: boolean;
  displayAsCardInHeader: boolean;
  isNew: boolean;
  isSale: boolean;
  printType: PrintType | null;
  categoryId: string | null;
  metaTagTitle: string;
  metaTagDescription: string;
  metaTagKeywords: string;
}
