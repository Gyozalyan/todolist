import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './reducers/counterSlice'
import messageReducer from './reducers/messageSlice'


const store = configureStore({
    reducer: {
        counter:counterReducer,
        message: messageReducer
    },
  })

  console.log('store', store)
  
  export {store}