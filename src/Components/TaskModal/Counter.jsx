import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { increment, decrement, incrementByAmount } from "../../redux/reducers/counterSlice";


export default function Counter() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch() 

  const handleInputChange = (event)=>{
    const {value} = event.target
    dispatch(incrementByAmount(value))
}

  return (
    <div>
      <div>
        <button aria-label="Increment value" onClick={()=> dispatch(increment())}>Increment</button>
        <h1>{count}</h1>
        <button aria-label="Decrement value" onClick={()=> dispatch(decrement())}>Decrement</button>
        <input type="number" onChange={handleInputChange}/>
      </div>
    </div>
  );
}

