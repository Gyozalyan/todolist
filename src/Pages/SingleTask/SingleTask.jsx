import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashCan,
  faPenToSquare,
  faCheck,
  faHistory,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import { formatDate } from "../../utils/helpers";
import styles from "./SingleTask.module.css";
import TaskAPI from "../../API/TaskAPI";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setLoader } from "../../redux/isLoading";
import TaskModal from "../../Components/TaskModal/TaskModal";

const taskApi = new TaskAPI();

export default function SingleTask() {
  const { taskID } = useParams();
  const [task, setTask] = useState(null);
  const [isEditSingleTaskOpen, setEditSingleTaskOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(setLoader(true));
    taskApi
      .getSingle(taskID)
      .then((task) => {
        setTask(task);
      })
      .catch((err) => {
        toast.error(err.message);
      })
      .finally(()=>dispatch(setLoader(false)));
  }, [taskID]);

  const onSingleTaskEdit = (taskEdit) => {
    dispatch(setLoader(true));
    taskApi
      .update(taskEdit)
      .then((updatedTaskForEditing) => {
        console.log(updatedTaskForEditing);
        setTask(updatedTaskForEditing);
        setEditSingleTaskOpen(false);
        toast.success(`Task has been updated successfully`);
      })

      .catch((err) => {
        toast.error(err.message);
      })
      .finally(()=>dispatch(setLoader(false)));;
  };

  const onDeleteSingleTask = () => {
    dispatch(setLoader(true));
    taskApi
      .deleteIdenticalTask(taskID)
      .then(() => {
        navigate("/");
        toast.success("The task has been deleted successfully!");
      })
      .catch((err) => {
        toast.error(err.message);
      })
      .finally(()=>dispatch(setLoader(false)));
  };

  return (
    <div className={styles.singleContainer}>
    <Container>
      <Row>
        <Col>
          {task ? (
            <div className={styles.task}>
              <div className={styles.taskBackground}>
                <div className={"text-center"}>{task.title}</div>

                <div className={`${styles.taskDescription} text-center `}>
                  {task.description}
                </div>

                <div className={` ${styles.taskDetails} mt-3`}>
                  <div className={styles.taskCondition}>
                    <div>
                      {" "}
                      <FontAwesomeIcon icon={faAngleRight} /> Status:{" "}
                      {task.status}
                    </div>

                    <div>
                      {" "}
                      <FontAwesomeIcon icon={faAngleRight} /> Created:{" "}
                      {formatDate(task.created_at)}
                    </div>
                    <div>
                      <FontAwesomeIcon icon={faAngleRight} /> Deadline:{" "}
                      {formatDate(task.date)}
                    </div>
                  </div>

                  <div className={styles.actionButtons}>
                    {task.status === "active" ? (
                      <Button
                        title="Mark as done"
                        className={`${styles.buttonsforXS} float-end btns action`}
                        variant="outline-success"
                        onClick={() =>
                          onSingleTaskEdit({ status: "done", _id: task._id })
                        }
                      >
                        <FontAwesomeIcon icon={faCheck} />
                      </Button>
                    ) : (
                      <Button
                        title="Mark as active"
                        className={`${styles.buttonsforXS} float-end btns action`}
                        variant="outline-info"
                        onClick={() =>
                          onSingleTaskEdit({ status: "active", _id: task._id })
                        }
                      >
                        <FontAwesomeIcon icon={faHistory} />
                      </Button>
                    )}

                    <Button
                      title="Delete"
                      variant="outline-danger"
                      className={`${styles.buttonsforXS} float-end btns action`}
                      onClick={onDeleteSingleTask}
                    >
                      <FontAwesomeIcon icon={faTrashCan} />
                    </Button>
                    <Button
                      title="edit"
                      variant="outline-warning"
                      className={`${styles.buttonsforXS} float-end btns action`}
                      onClick={() => {
                        setEditSingleTaskOpen(true);
                      }}
                    >
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div> Not found </div>
          )}
        </Col>
        {isEditSingleTaskOpen && (
          <TaskModal
            onCancel={() => {
              setEditSingleTaskOpen(false);
            }}
            onSave={onSingleTaskEdit}
            data={task}
          />
        )}
      </Row>
    </Container>
    </div>
  );
}
