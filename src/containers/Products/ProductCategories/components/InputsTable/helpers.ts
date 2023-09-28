import * as yup from 'yup';
import { integerValidation, textWidthValidation } from '@utils/schemas';
import { DefaultInkInEstimator, PrintType, StaticShippingFacility } from '@features/subcategories/enums';
import { selectDefaultValue } from '@containers/common/Select/helpers';
import { IAddSubcategoriesPayload, ISubcategoriesInfo } from '@features/subcategories/types';

type StaticShippingFacilityType = {
  [key in StaticShippingFacility]: boolean;
};
export interface IAddSubcategoryForm {
  id?: string;
  title: string;
  description: string;
  photo: string;
  categoryId: string;
  printType: PrintType | string;
  isNew: boolean;
  isSale: boolean;
  useGrandFormatSQFtTemplate: boolean;
  defaultInkInEstimator: DefaultInkInEstimator | string;
  visibleOnSite: boolean;
  showInSpotlight: boolean;
  displayAsCardInHeader: boolean;
  categoryDiscountOffMSRP: string;
  metaTagTitle: string;
  metaTagDescription: string;
  metaTagKeywords: string;
  staticShippingFacilityAll: boolean;
  staticShippingFacility: StaticShippingFacilityType;
}

const defaultStaticShippingFacility = {
  [StaticShippingFacility.ARIZONA]: false,
  [StaticShippingFacility.CALIFORNIA]: false,
  [StaticShippingFacility.FLORIDA]: false,
  [StaticShippingFacility.MICHIGAN]: false,
  [StaticShippingFacility.NEW_JERSEY]: false,
  [StaticShippingFacility.NEW_YORK]: false,
  [StaticShippingFacility.NORTH_CAROLINA]: false,
  [StaticShippingFacility.OHIO]: false,
  [StaticShippingFacility.TEXAS]: false,
  [StaticShippingFacility.UPSTATE_NEW_YORK]: false,
  [StaticShippingFacility.WISCONSIN]: false,
};

export const defaultValues = {
  title: '',
  description: '',
  photo: '',
  categoryId: selectDefaultValue,
  printType: selectDefaultValue,
  defaultInkInEstimator: selectDefaultValue,
  visibleOnSite: false,
  displayAsCardInHeader: false,
  staticShippingFacilityAll: false,
  useGrandFormatSQFtTemplate: false,
  isNew: false,
  isSale: false,
  showInSpotlight: false,
  categoryDiscountOffMSRP: '',
  staticShippingFacility: { ...defaultStaticShippingFacility },
  metaTagTitle: '',
  metaTagDescription: '',
  metaTagKeywords: '',
};

export const AddSubcategorySchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required').max(500, 'The maximum length is 500 characters'),
  photo: yup.string().required('Photo is required'),
  categoryId: yup.string().required('Category is required'),
  printType: yup.string()
    .required('Print type is required'),
  metaTagDescription: textWidthValidation,
  metaTagTitle: textWidthValidation,
  categoryDiscountOffMSRP: integerValidation.nullable(),
});

export const printTypeNames: { [key in PrintType]: string } = {
  [PrintType.OFFSET_PRODUCTS]: 'Offset Production',
  [PrintType.GRAND_FORMAT_PRODUCTS]: 'Grand Format Products',
  [PrintType.PROMO_PRODUCTS]: 'Promo Products',
};

export const printTypeName = (name: PrintType | null) => {
  return name && printTypeNames[name];
};

export const printTypeValues = Object.entries(printTypeNames).map(([key, optionName]) => ({
  value: key as PrintType,
  optionName,
}));

export const defaultInkInEstimatorValues = Object.values(DefaultInkInEstimator).map((v) => ({
  value: v,
  optionName: v,
}));

export const formattingPayload = (data: IAddSubcategoryForm) => {
  const {
    id,
    staticShippingFacility,
    title,
    description,
    photo,
    categoryId,
    printType,
    isNew,
    isSale,
    useGrandFormatSQFtTemplate,
    defaultInkInEstimator,
    visibleOnSite,
    displayAsCardInHeader,
    categoryDiscountOffMSRP,
    metaTagTitle,
    metaTagDescription,
    metaTagKeywords,
    staticShippingFacilityAll,
    showInSpotlight,
  } = data;

  const payload: IAddSubcategoriesPayload = {
    id,
    title,
    description,
    photo,
    categoryId,
    printType,
    isNew,
    isSale,
    useGrandFormatSQFtTemplate,
    defaultInkInEstimator: defaultInkInEstimator || null,
    visibleOnSite,
    displayAsCardInHeader,
    categoryDiscountOffMSRP: +categoryDiscountOffMSRP || null,
    metaTagTitle,
    metaTagDescription,
    metaTagKeywords,
    showInSpotlight,
  };

  if (staticShippingFacility) {
    const facility: IAddSubcategoriesPayload['staticShippingFacility'] = staticShippingFacilityAll
      ? (Object.keys(staticShippingFacility) as IAddSubcategoriesPayload['staticShippingFacility'])
      : Object.keys(staticShippingFacility).filter(
        (item) => staticShippingFacility[item as keyof IAddSubcategoryForm['staticShippingFacility']],
      ) as IAddSubcategoriesPayload['staticShippingFacility'];

    payload.staticShippingFacility = facility;
  }

  if (id) {
    payload.id = id;
  }

  return payload;
};

export const formattedShippingFacility = (list: string[]) => {
  const initialFacility = { ...defaultStaticShippingFacility } as StaticShippingFacilityType;

  const staticShippingFacility = Object.keys(initialFacility).reduce((acc, item) => {
    acc[item as keyof StaticShippingFacilityType] = list.includes(item);

    return acc;
  }, initialFacility);

  const staticShippingFacilityAll = Object.values(staticShippingFacility).every(Boolean);

  return { staticShippingFacility, staticShippingFacilityAll };
};

export const formattedData = (data: ISubcategoriesInfo): IAddSubcategoryForm => {
  const { staticShippingFacility, staticShippingFacilityAll } = formattedShippingFacility(data.staticShippingFacility);

  const newData = {
    ...data,
    categoryDiscountOffMSRP: data.categoryDiscountOffMSRP?.toString(),
    staticShippingFacility,
    staticShippingFacilityAll,
  } as IAddSubcategoryForm;

  return newData;
};
