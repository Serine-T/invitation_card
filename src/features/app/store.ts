import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from '@features/auth/slice';
import usersReducer from '@features/users/slice';
import categoriesReducer from '@features/categories/slice';
import bannersReducer from '@features/banners/slice';
import subcategoriesReducer from '@features/subcategories/slice';
import bestSellersReducer from '@features/bestSellers/slice';
import attributeCategoriesReducer from '@features/attributeCategories/slice';
import attributesReducer from '@features/attributes/slice';
import templateCategoriesReducer from '@features/templateCategories/slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    categories: categoriesReducer,
    banners: bannersReducer,
    subcategories: subcategoriesReducer,
    bestSellers: bestSellersReducer,
    attributeCategories: attributeCategoriesReducer,
    attributes: attributesReducer,
    templateCategories: templateCategoriesReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
