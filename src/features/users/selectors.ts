import { RootState } from '@features/app/store';

export const selectUsers = (state: RootState) => state.users;
