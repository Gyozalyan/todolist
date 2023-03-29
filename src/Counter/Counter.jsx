import styles from "./Counter.module.css";
import { useState, useEffect, useMemo } from "react";

const Counter = () => {
  const [counter, setCounter] = useState(0);
  const [counterState, setCounterState] = useState("Zero");

  useEffect(() => {
    if (counter > 0) {
      setCounterState("Positive");
    } else if (counter < 0) {
      setCounterState("Negative");
    } else if (counter === 0) {
      setCounterState("Zero");
    }

    console.log("useffect update");
  }, [counter]);

  return (
    <div>
      <button
        className={styles.btn}
        onClick={() => {
          setCounter(counter + 1);
        }}
      >
        Increment
      </button>
      <h1>{counter}</h1>
      <p>{counterState}</p>
      <button
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
