import styles from "./task.module.css";
import { Form, Button, Card, Col } from "react-bootstrap";
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
    <Col xs={12} sm ={12} md={6} lg={6} xxl={6}>
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
                  className={`${styles.buttonsforXS} float-end btns action`}
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
                  className= {`${styles.buttonsforXS} float-end btns action`}
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
                className={`${styles.buttonsforXS} float-end btns action`}
                onClick={() => {
                  onDeleteTask(data._id);
                }}
              >
                <FontAwesomeIcon icon={faTrashCan} />
              </Button>
              <Button
                title="edit"
                variant="outline-warning"
                className={`${styles.buttonsforXS} float-end btns action`}
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

    
    </Col>

   
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
