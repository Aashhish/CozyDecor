import { configureStore } from '@reduxjs/toolkit'
import { counterSlice } from './Reducers/CounterSlice'
import { postSlice } from './Reducers/BlogSlice'

export const store = configureStore({
  reducer: {
    counter:counterSlice.reducer,
    posts:postSlice.reducer,
  },
})