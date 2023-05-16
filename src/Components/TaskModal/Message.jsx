import React from "react";
import { useSelector, useDispatch } from "react-redux";

import {setMessage, deleteMessage } from "../../redux/reducers/messageSlice";


export default function Message() {
  const message = useSelector((state) => state.message.text);
  const dispatch = useDispatch() 

  const handleInputChange = (event)=>{
    const {value} = event.target
    dispatch(setMessage(value))
   
}

  return (
    <div>
      <div>
        <h4>{message}</h4>
        {/* <button aria-label="Increment value" onClick={()=> dispatch(increment())}>Increment</button> */}
        {/* <h1>{count}</h1> */}
        {/* <button aria-label="Decrement value" onClick={()=> dispatch(decrement())}>Decrement</button> */}
        <input type="text" value = {message} onChange={handleInputChange}/>
      </div>
    </div>
  );
}

