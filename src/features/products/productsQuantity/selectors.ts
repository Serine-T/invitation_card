import { RootState } from '@features/app/store';

export const selectProductsQuantities = (state: RootState) => state.productsQuantities;
