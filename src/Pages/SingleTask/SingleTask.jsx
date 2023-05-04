import { useParams } from "react-router-dom";
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
import { ToastContainer, toast } from "react-toastify";
import { Button } from "react-bootstrap";

const taskApi = new TaskAPI();

export default function SingleTask() {
  const { taskID } = useParams();
  const [task, setTask] = useState(null);
  console.log(task);

  useEffect(() => {
    taskApi
      .getSingle(taskID)
      .then((task) => {
        setTask(task);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }, [taskID]);

  return (
    
    <div>
      {task ? (
        <div className={styles.task}>
          <div className={styles.taskBackground }>


            <div className={'text-center'}>{task.title}</div>


            <div className={`${styles.taskDescription} text-center `}>{task.description}</div>

            <div className={` ${styles.taskDetails} mt-3`}>
              <div className={styles.taskCondition}>
                <div>
                  {" "}
                  <FontAwesomeIcon icon={faAngleRight} /> Status: {task.status}
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
                    // onClick={() =>
                    //   onChangeStatus({ status: "done", _id: task._id })
                    // }
                  >
                    <FontAwesomeIcon icon={faCheck} />
                  </Button>
                ) : (
                  <Button
                    title="Mark as active"
                    className={`${styles.buttonsforXS} float-end btns action`}
                    variant="outline-info"
                    // onClick={() =>
                    //   onChangeStatus({ status: "active", _id: task._id })
                    // }
                  >
                    <FontAwesomeIcon icon={faHistory} />
                  </Button>
                )}

                <Button
                  title="Delete"
                  variant="outline-danger"
                  className={`${styles.buttonsforXS} float-end btns action`}
                  // onClick={() => {
                  //   onDeleteTask(task._id);
                  // }}
                >
                  <FontAwesomeIcon icon={faTrashCan} />
                </Button>
                <Button
                  title="edit"
                  variant="outline-warning"
                  className={`${styles.buttonsforXS} float-end btns action`}
                  // onClick={() => {
                  //   onTaskEdit(task);
                  // }}
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
      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
 
  );
}
