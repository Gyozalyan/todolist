import styles from "./Counter.module.css";
import { useState, useEffect } from "react";

const Counter = () => {
  const [counter, setCounter] = useState(0);
  const [counterState, setCounterState] = useState("Zero");

  useEffect(() => {

    return counter > 0?setCounterState("Positive"):counter < 0? setCounterState("Negative"): setCounterState("Zero")},
    [counter]);

  return (
    <div>
      <button
        className={`${styles.increment} ${styles.btn}`}
 
        onClick={() => {
          setCounter(counter + 1);
        }}
      >
        Increment
      </button >
      <h1>{counter}</h1>
      <p>{counterState}</p>
      <button
      className= {`${styles.decrement} ${styles.btn}`}
        onClick={() => {
          setCounter(counter - 1);
        }}
      >
        Decrement
      </button>
    </div>
  );
};

export default Counter;
