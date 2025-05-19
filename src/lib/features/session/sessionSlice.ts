import { createSlice } from "@reduxjs/toolkit";
import { UserInfo } from "@/lib/types";

type SessionState = {
  session: UserInfo | null;
};

const initialState: SessionState = {
  session: null,
};

export const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    setSession: (state, action) => {
      state.session = action.payload;
    },
    removeSession: (state) => {
      state.session = null;
    },
  },
});

export const { setSession, removeSession } = sessionSlice.actions;
export const sessionReducer = sessionSlice.reducer;
