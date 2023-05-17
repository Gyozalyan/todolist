import { configureStore } from '@reduxjs/toolkit'
import taskCountReducer from './taskCount'
import loaderReducer from './isLoading'

export const store = configureStore({
    reducer: {
   count:taskCountReducer,
   loader:loaderReducer
    },
  })