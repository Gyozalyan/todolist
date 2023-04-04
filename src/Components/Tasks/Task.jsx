import React, { useState } from "react";
import styles from "./task.module.css";
import { Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { memo } from "react";

 function Task({ data, deleteTask, selecteTasks, number }) {
  return (
    <div className={styles.task}>
      <div className={styles.taskBackground}>
        <div className={styles.checkBody}>
          <div> {data.date}</div>

          <Form.Check
            className={styles.selectTask}
            onClick={() => {
              selecteTasks(data.id);
            }}
          />

          <div className={styles.taskContent}>
            <strong>
              {number}. {data.title}{" "}
            </strong>{" "}
            : {data.body}
          </div>
        </div>

        <div className={styles.actionButtons}>
          <Button
            variant="outline-danger"
            className="float-end btns"
            onClick={() => {
              deleteTask(data.id);
            }}
          >
            <FontAwesomeIcon icon={faTrashCan} />
          </Button>
          <Button
            variant="outline-warning"
            className="float-end btns"
            // onClick={makeTextEditable}
          >
            <FontAwesomeIcon icon={faPenToSquare} />
          </Button>
        </div>
      </div>
    </div>
  );
}
export default memo(Task)