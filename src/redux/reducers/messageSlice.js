import { createSlice } from '@reduxjs/toolkit'

export const messageSlice = createSlice({
  name: 'message', 
  initialState:{ 
    text:''
  },
  reducers: { 
    setMessage: (state, action) => {
       state.text = action.payload
    },
    deleteMessage: (state) => {
      state.text = ''
    },
    
  },
})

console.log('messageSlice', messageSlice)

export const { setMessage, deleteMessage } = messageSlice.actions

export default messageSlice.reducer 