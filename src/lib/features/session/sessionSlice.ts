import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Payload } from '@/lib/types'

type SessionState = {
  session: Payload | null
}

const initialState: SessionState = {
  session: null,
}

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setSession: (state, action) => {
      state.session = action.payload
    },
  },
})

export const { setSession } = sessionSlice.actions
export const sessionReducer = sessionSlice.reducer
