import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
export interface AuthStateProps {
  isAuthenticated: boolean;
  userData: any;
}

const initialState: AuthStateProps = {
  isAuthenticated: false,
  userData: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthState: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    setUserData: (state, action: PayloadAction<any>) => {
      state.userData = action.payload;
      state.isAuthenticated = true;
    },
    setLogout: (state) => {
      state.isAuthenticated = false;
      state.userData = null;
    }
  },
});

export const { setAuthState, setUserData, setLogout } = authSlice.actions;
export const authReducer = authSlice.reducer;