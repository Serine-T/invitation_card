import { RootState } from '@features/app/store';

export const selectProductsAttributes = (state: RootState) => state.productsAttributes;
