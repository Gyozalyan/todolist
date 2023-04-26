import styles from "./task.module.css";
import { Form, Button, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashCan,
  faPenToSquare,
  faCheck,
  faHistory,
  faAngleRight
} from "@fortawesome/free-solid-svg-icons";
import { memo } from "react";
import { PropTypes } from "prop-types";
import { formatDate } from "../../utils/helper";

function Task({
  data,
  onDeleteTask,
  onSelecteTasks,
  isChecked,
  number,
  onTaskEdit,
  onChangeStatus,
}) {

  return (
    <Card.Body>
      <div className={styles.task}>
        <div className={styles.taskBackground}>
          <div className={styles.checkBody}>
            <Form.Check
              className={styles.selectTask}
              onChange={() => {
                onSelecteTasks(data._id);
              }}
              checked={isChecked}
            />

            <Card.Title className={styles.textElipsis}>
              {number}. {data.title}
            </Card.Title>
          </div>
          <Card.Text className={`${styles.taskContent} ${styles.textElipsis}`}>
            {" "}
            <strong> Description:</strong> {data.description} 
          </Card.Text>
          <div className={` ${styles.taskDetails} mt-3`}>
            <div className={styles.dataFeatures}>
              <Card.Text>  <FontAwesomeIcon icon={faAngleRight} /> Status: {data.status}</Card.Text>

              <Card.Text> <FontAwesomeIcon icon={faAngleRight} /> Created: {formatDate(data.created_at)}</Card.Text>
              <Card.Text> <FontAwesomeIcon icon={faAngleRight} />  Deadline: {formatDate(data.date)}</Card.Text>
            </div>

            <div className={styles.actionButtons}>


              {data.status === "active" ? (
                <Button
                  title="Mark as done"
                  className="float-end btns action"
                  variant="outline-success"
                  onClick={() =>
                    onChangeStatus({ status: "done", _id: data._id })
                  }
                >
                    <FontAwesomeIcon icon={faCheck} />
                </Button>
              ) : (
                <Button
                  title="Mark as active"
                  className="float-end btns action"
                  variant="outline-info"
                  onClick={() =>
                    onChangeStatus({ status: "active", _id: data._id })
                  }
                >
               <FontAwesomeIcon icon={faHistory} />
                </Button>
              )}

              <Button
                title="Delete"
                variant="outline-danger"
                className="float-end btns action"
                onClick={() => {
                  onDeleteTask(data._id);
                }}
              >
                <FontAwesomeIcon icon={faTrashCan} />
              </Button>
              <Button
                title="edit"
                variant="outline-warning"
                className="float-end btns action"
                onClick={() => {
                  onTaskEdit(data);
                }}
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
  onDeleteTask: PropTypes.func.isRequired,
  onSelecteTasks: PropTypes.func.isRequired,
  isChecked: PropTypes.bool.isRequired,
  onTaskEdit: PropTypes.func,
};

export default memo(Task);
