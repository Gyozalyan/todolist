import React, { useState, useEffect } from 'react'
import styles from './TaskCounter.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { PropTypes } from "prop-types";

import {
  faSpinner,
  faCheckDouble,
  faListUl,
} from '@fortawesome/free-solid-svg-icons'

const TaskCounter = ({ tasks }) => {
  const [tasksCounter, setTasksCounter] = useState({
    doneTasks: 0,
    activeTasks: 0,
    allTasks: tasks.length,
  })


  useEffect(() => {
    const doneTasks = []
    const activeTasks = []

    tasks.forEach((task) => {
      if (task.status === 'done') {
        doneTasks.push(task.status)
      }

      if (task.status === 'active') {
        activeTasks.push(task.status)
      }
    })

    setTasksCounter({
      ...tasksCounter,
      doneTasks: doneTasks.length,
      activeTasks: activeTasks.length,
      allTasks: tasks.length,
    })
    

  }, [tasks]) 

  return (
    <div className={styles.counterWidget}>
      <div className={styles.counterSection}>
        <FontAwesomeIcon icon={faCheckDouble} />

        <h1 id="completeCounter" className={styles.counterValue}>
          {tasksCounter.doneTasks}
        </h1>
        <h2 className={styles.counterTitle}>Completed</h2>
      </div>
      <div className={styles.counterSection}>
        <FontAwesomeIcon icon={faSpinner} spin />

        <h1 id="ongoingCounter" className={styles.counterValue}>
        {tasksCounter.activeTasks}
        </h1>
        <h2 className={styles.counterTitle}>Active</h2>
      </div>
      <div className={styles.counterSection}>
        <FontAwesomeIcon icon={faListUl} />
        <h1 id="summaryCounter" className={styles.counterValue}>
        {tasksCounter.allTasks}
        </h1>
        <h2 className={styles.counterTitle}>Tasks</h2>
      </div>
    </div>
  )
}

TaskCounter.propTypes = {
    tasks: PropTypes.array.isRequired,
  };

export default TaskCounter
