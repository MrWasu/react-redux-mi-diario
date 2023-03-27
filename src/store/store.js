import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './auth'
import { diarySlice } from './diary/diarySlice'

export const store = configureStore({
  reducer: {
    auth:    authSlice.reducer,
    diary: diarySlice.reducer
  },
})