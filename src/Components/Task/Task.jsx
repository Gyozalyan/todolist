import styles from "./task.module.css";
import { Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { memo } from "react";
import { PropTypes } from "prop-types";
import Date from '../Date'


 function Task({ data, deleteTask, selecteTasks, number }) {

  return (
    <div className={styles.task}>
      
      <div className={styles.taskBackground}>
     
        <div className={styles.checkBody}>
          
        <div> <Date/> </div>
          <Form.Check
            className={styles.selectTask}
            onClick={() => {
              selecteTasks(data._id);
            }}
          />

          <div className={styles.taskContent}>
            <strong>
              {number}. {data.title}{" "}
            </strong>{" "}
            : <br/> {data.description}
          </div>
        </div>

        <div className={styles.actionButtons}>
          <Button
            variant="outline-danger"
            className="float-end btns"
            onClick={() => {
              deleteTask(data._id);
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


Task.propTypes= {
  data: PropTypes.object.isRequired,
  deleteTask:PropTypes.func.isRequired,
  selecteTasks:PropTypes.func.isRequired,
}

export default memo(Task)