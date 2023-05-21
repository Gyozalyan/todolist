import { configureStore } from '@reduxjs/toolkit'
import taskCountReducer from './taskCount'
import loaderReducer from './isLoading'
import userNameReducer from './userName'

export const store = configureStore({
    reducer: {
   count:taskCountReducer,
   loader:loaderReducer,
   userName:userNameReducer
    },
  })