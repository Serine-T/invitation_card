import { RootState } from '@features/app/store';

export const selectBestSellers = (state: RootState) => state.bestSellersSlice;
