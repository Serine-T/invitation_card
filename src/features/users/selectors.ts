import { RootState } from '@features/app/store';

export const selectIsAuth = (state: RootState) => state.auth;
