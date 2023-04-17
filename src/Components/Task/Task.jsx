import styles from "./task.module.css";
import { Form, Button, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { memo } from "react";
import { PropTypes } from "prop-types";
import { formatDate } from "../../utils/helper";

function Task({ data, deleteTask, selecteTasks, number }) {
  return (
    <Card.Body>
      <div className={styles.task}>
        <div className={styles.taskBackground}>
          <div className={styles.checkBody}>
            <div> {formatDate(data.created_at)} </div>
            <Form.Check
              className={styles.selectTask}
              onClick={() => {
                selecteTasks(data._id);
              }}
            />

            <Card.Title className={styles.textElipsis}>
              {number}. {data.title} :
            </Card.Title>
            <Card.Text>   {data.description}</Card.Text>
          </div>

          <div className={` ${styles.taskDetails} mt-3`}>

          <Card.Text>Status: {data.status}</Card.Text>
          <Card.Text>Deadline: {formatDate(data.date)}</Card.Text>


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
      </div>
    </Card.Body>
  );
}

Task.propTypes = {
  data: PropTypes.object.isRequired,
  deleteTask: PropTypes.func.isRequired,
  selecteTasks: PropTypes.func.isRequired,
};

export default memo(Task);
