import { InputTypes, ValidFieldNames } from '@utils/types';
import * as yup from 'yup';
import { intagerValidation, textWidthValidation } from '@utils/schemas';
import { DefaultInkInEstimator, PrintType, StaticShippingFacility } from '@features/subcategories/enums';
import { selectDefaultValue } from '@containers/common/Select/helpers';
import { IAddSubcategoriesPayload, ISubcategoriesInfo } from '@features/subcategories/types';

type StaticShippingFacilityType = {
    [StaticShippingFacility.ARIZONA]: boolean;
    [StaticShippingFacility.CALIFORNIA]: boolean;
    [StaticShippingFacility.FLORIDA]: boolean;
    [StaticShippingFacility.MICHIGAN]: boolean;
    [StaticShippingFacility.NEW_JERSEY]: boolean;
    [StaticShippingFacility.NEW_YORK]: boolean;
    [StaticShippingFacility.NORTH_CAROLINA]: boolean;
    [StaticShippingFacility.OHIO]: boolean;
    [StaticShippingFacility.TEXAS]: boolean;
    [StaticShippingFacility.UPSTATE_NEW_YORK]: boolean;
    [StaticShippingFacility.WISCONSIN]: boolean;
  }
export interface IAddSubcategoryForm {
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
  categoryDiscountOffMSRP: '',
  staticShippingFacility: { ...defaultStaticShippingFacility },
  metaTagTitle: '',
  metaTagDescription: '',
  metaTagKeywords: '',
};

export const AddSubcategorySchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  photo: yup.string().required('Photo is required'),
  categoryId: yup.string().required('Category is required'),
  printType: yup.string()
    .oneOf(Object.values(PrintType), 'print')
    .required('Print type is required'),
  metaTagDescription: textWidthValidation,
  metaTagTitle: textWidthValidation,
  categoryDiscountOffMSRP: intagerValidation.nullable(),
});

export const inputsRows1: ValidFieldNames[] = [
  {
    label: 'Category',
    field: 'categoryId',
    type: InputTypes.select,
    isRequired: true,
  },
  {
    label: 'Print type',
    field: 'printType',
    type: InputTypes.select,
    isRequired: true,
  },
  {
    label: 'Use Grand Format SQ. Ft. Template',
    field: 'useGrandFormatSQFtTemplate',
    type: InputTypes.checkbox,
  },
  {
    label: 'Mark as new',
    field: 'isNew',
    type: InputTypes.checkbox,
  },
  {
    label: 'Mark as sale',
    field: 'isSale',
    type: InputTypes.checkbox,
  },
  {
    label: 'Category Discount off MSRP(%)',
    field: 'categoryDiscountOffMSRP',
    type: InputTypes.text,
  },
  {
    label: 'Default Ink in Estimator',
    field: 'defaultInkInEstimator',
    type: InputTypes.select,
  },
];
export const inputsRows2: ValidFieldNames[] = [
  {
    label: 'Photo',
    field: 'photo',
    type: InputTypes.image,
    isRequired: true,
  },
  {
    label: 'Title',
    field: 'title',
    type: InputTypes.text,
    isRequired: true,
  },
  {
    label: 'Description',
    field: 'description',
    type: InputTypes.textarea,
    isRequired: true,
  },
  {
    label: 'Visible On Site',
    field: 'visibleOnSite',
    type: InputTypes.checkbox,
  },
  {
    label: 'Display as Card in Header',
    field: 'displayAsCardInHeader',
    type: InputTypes.checkbox,
  },
];

export const printTypeValues = [
  {
    value: PrintType.OFFSET_PRODUCTS,
    optionName: 'Offset production',
  },
  {
    value: PrintType.GRAND_FORMAT_PRODUCTS,
    optionName: 'Grand format products',
  },
  {
    value: PrintType.PROMO_PRODUCTS,
    optionName: 'Promo Products',
  },
];

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
    defaultInkInEstimator,
    visibleOnSite,
    displayAsCardInHeader,
    categoryDiscountOffMSRP: +categoryDiscountOffMSRP || null,
    metaTagTitle,
    metaTagDescription,
    metaTagKeywords,
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
  const staticShippingFacility = { ...defaultStaticShippingFacility } as StaticShippingFacilityType;
  let staticShippingFacilityAll = true;

  (Object.keys(staticShippingFacility) as Array<keyof StaticShippingFacilityType>).forEach((item) => {
    if (list.includes(item)) {
      (staticShippingFacility)[item] = true;
    } else {
      staticShippingFacility[item] = false;
      staticShippingFacilityAll = false;
    }
  });

  console.log('helppp***', { ...staticShippingFacility, staticShippingFacilityAll });

  return { staticShippingFacility, staticShippingFacilityAll };
};

export const formattedData = (data: ISubcategoriesInfo): IAddSubcategoryForm => {
  const { staticShippingFacility, staticShippingFacilityAll } = formattedShippingFacility(data.staticShippingFacility);

  const newData = {
    ...data,
    categoryDiscountOffMSRP: data.categoryDiscountOffMSRP.toString(),
    staticShippingFacility,
    staticShippingFacilityAll,
  } as IAddSubcategoryForm;

  return newData;
};
