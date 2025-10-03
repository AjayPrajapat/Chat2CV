import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  token?: string;
  user?: {
    id: string;
    email: string;
    name?: string;
  };
  status: 'idle' | 'loading' | 'authenticated' | 'error';
  error?: string;
}

const initialState: AuthState = {
  status: 'idle'
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    startAuth(state) {
      state.status = 'loading';
      state.error = undefined;
    },
    authSuccess(
      state,
      action: PayloadAction<{ token: string; user: AuthState['user'] }>
    ) {
      state.status = 'authenticated';
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    authFailure(state, action: PayloadAction<string>) {
      state.status = 'error';
      state.error = action.payload;
    },
    signOut() {
      return initialState;
    }
  }
});

export const { startAuth, authSuccess, authFailure, signOut } = authSlice.actions;
export default authSlice.reducer;
