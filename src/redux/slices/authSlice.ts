import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  user: {
    name: string;
    email: string;
    role: "doctor" | "patient" | "admin" | null;
  } | null;
  loading: boolean;
}

const initialState: UserState = {
  user: null,
  loading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserState["user"]>) {
      state.user = action.payload;
      state.loading = false;
    },
    clearUser(state) {
      state.user = null;
      state.loading = false;
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
