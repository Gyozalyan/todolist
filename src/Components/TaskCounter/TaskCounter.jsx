import React, { useState, useEffect } from 'react';
import styles from'./TaskCounter.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faSpinner, faCheckDouble, faListUl } from '@fortawesome/free-solid-svg-icons';


const NumberCounter = () => {
    const [completeCount, setCompleteCount] = useState(0);
    const [ongoingCount, setOngoingCount] = useState(0);
    const [summaryCount, setSummaryCount] = useState(0);
  
    useEffect(() => {
      const intervalId = setInterval(() => {
        setCompleteCount((prevCount) => prevCount + 1);
      }, 1000); // auto-increment complete counter every 1 second
  
      return () => {
        clearInterval(intervalId);
      };
    }, []); // empty dependency array to run the effect only once on mount
  
    return (
      <div className={styles.counterWidget}>
        <div className= {styles.counterSection}>
        <FontAwesomeIcon icon={faCheckDouble} />
        
        <h1 id="completeCounter" className={styles.counterValue}>{completeCount}</h1>
        <h2 className={styles.counterTitle}>Completed</h2>
         
        </div>
        <div  className= {styles.counterSection}>
        <FontAwesomeIcon icon={faSpinner} spin /> 

        <h1 id="ongoingCounter" className={styles.counterValue}>{ongoingCount}</h1>
          <h2 className={styles.counterTitle}>Pending</h2>
          
        </div>
        <div  className= {styles.counterSection}>
        <FontAwesomeIcon icon={faListUl} />
                <h1 id="summaryCounter" className={styles.counterValue}>{summaryCount}</h1>
          <h2 className={styles.counterTitle}>Tasks</h2>
          
        </div>
      </div>
    );
};

export default NumberCounter;
