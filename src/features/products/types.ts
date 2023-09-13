import { DefaultInkInEstimator, PrintType, StaticShippingFacility } from './enums';

export interface IState {
  isLoading: boolean;
  data: IProductsInfo[] | IProductsSearchInfo[];
  actionLoading: boolean;
  errorMessage: null | string;
}

export interface GrandFormatDiscount {
  quantity: number;
  discountPercent: number;
}
export interface GrandFormatOptions {
  unitDisplay: string;
  widthFrom: string;
  widthTo: string;
  heightFrom: string;
  heightTo: string;
  maxHeight: string;
  maxWidth: string;
  grandFormatDiscounts: GrandFormatDiscount[];
}
export interface IProductsPayload {
  id?: string;
  name: string;
  description?: string;
  productSKU: string;
  subCategoryId: string;
  weight?: number | string | null;
  visibleOnSite?: boolean;
  showInSpotlight?: boolean;
  isDiscountable?: boolean;
  quarterhouseProductCode?: string;
  fouroverProdCode?: string;
  fouroverTurnaroundCode?: string;
  grandFormatOptions?: GrandFormatOptions | null ;
}

export interface IProductsInfo {
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

export interface ISearchProducts {
  searchTerm?: string;
  visibleOnSite?: string;
  category?:string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  productSKU: string;
  sort: number;
  weight: number;
  visibleOnSite: boolean;
  showInSpotlight: boolean;
  isDiscountable: boolean;
  quarterhouseProductCode: string;
  fouroverProdCode: string;
  fouroverTurnaroundCode: string;
}

export interface IProductsSearchInfo {
  id: string;
  title: string;
  products: Product[];
}
