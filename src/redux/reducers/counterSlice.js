import { createSlice } from '@reduxjs/toolkit'
// import type { PayloadAction } from '@reduxjs/toolkit'



export const counterSlice = createSlice({
  name: 'counter', // Ընդհանուր redux օբյեկտում այն դառնալու է key, value===արժեք
  initialState:{ // ամենաառաջին state/ defualt արժեքներ, ցանկացած քանակի, ցանկացած տեղ կարող ենք պահել
    value:0
  },
  reducers: { // օբյեկտ որի մեջ կա մի քանի մեթոդներ, հենց էստեղ ենք որոշում որ պետք է փոխենք state
    increment: (state) => {
       state.value += 1 // այստեղ փեքւջների շնորհիվ կարող ենք state-ը փոխել անմիջապես, առանց քոփի և այլ բաներ անելու նախապես
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => { //count-ը մեծացվի փոխանված թվի չափով ոչ թե հստակ 1-ով, վերջինս հանդիսանում է 2-րդ արգումենտը,
                                            //1-ին միշտ state-ն է                    
      state.value = action.payload
    },
  },
})

console.log('countersilce', counterSlice)

// երբ createSlice-ին փոխանցում ենք օբյեկտը, այն ստեղծում է actions անունով օբյեկտ ու մեր տված մեթոդները տեղափոխում է էնտեղ
// դրա համար destructuring-ի միջոցով actions-ի մեջից է վերցրել
export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default counterSlice.reducer // սա արդեն իր ստեղծած օբյեկտն է


// սա արդեն պետք է կպցնենք store -ին որ հասկանա, որ իր մի մասն է կազմում