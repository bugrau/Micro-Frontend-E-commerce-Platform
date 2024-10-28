import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppState {
  globalError: string | null;
}

const initialState: AppState = {
  globalError: null
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setGlobalError: (state, action: PayloadAction<string | null>) => {
      state.globalError = action.payload;
    },
    clearGlobalError: (state) => {
      state.globalError = null;
    }
  }
});

export const { setGlobalError, clearGlobalError } = appSlice.actions;
export default appSlice.reducer;
export type { AppState };
