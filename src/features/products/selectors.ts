import { RootState } from '@features/app/store';

export const selectProducts = (state: RootState) => state.products;
