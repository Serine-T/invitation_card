import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from '@features/auth/slice';
import usersReducer from '@features/users/slice';
import categoriesReducer from '@features/categories/slice';
import bannersReducer from '@features/banners/slice';
import subcategoriesReducer from '@features/subcategories/slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    categories: categoriesReducer,
    bannersSlice: bannersReducer,
    subcategories: subcategoriesReducer,
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
