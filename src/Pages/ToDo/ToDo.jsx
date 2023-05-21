import styles from "./todo.module.css";
import Task from "../../Components/Task/Task";
import DeleteSelected from "../../Components/DeleteSelected/DeleteSelected";
import ConfirmDialog from "../../Components/ConfirmDialogDelete/ConfirmDialog";
import TaskAPI from "../../API/TaskAPI";
import TaskModal from "../../Components/TaskModal/TaskModal";
import "react-toastify/dist/ReactToastify.css";
import SearchAndFilter from "../../Components/SearchAndFilter/SearchAndFilter";
import TaskCounter from "../../Components/TaskCounter/TaskCounter";
import { useState, useEffect, useCallback, memo } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getTaskCount } from "../../redux/taskCount";
import { setLoader } from "../../redux/isLoading";

const taskApi = new TaskAPI();

const ToDo = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTasks, setSelectedTasks] = useState(new Set());
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [isAddTaskModalOpen, setAddTaskModalOpen] = useState(false);
  const [editableTask, setEditableTask] = useState(null);
  const [deadline, setDeadline] = useState(new Date());
  const userName = useSelector(state=>state.userName.name)
  const dispatch = useDispatch();

  const getInitialTasks = useCallback((filters) => {
    dispatch(setLoader(true));
    taskApi
      .getAllTasks(filters)
      .then((tasks) => {
        
        setTasks(tasks);
      })
      .catch((err) => {
        toast.error(err.message);
      })
      .finally(()=>dispatch(setLoader(false)));
  }, [getInitialTasks]);

  useEffect(() => {
    getInitialTasks();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    dispatch(getTaskCount(tasks.length));
    // eslint-disable-next-line
  }, [tasks.length,dispatch]);

  const addTaskTemplate = (newTask) => {
    dispatch(setLoader(true));
    taskApi
      .addTask(newTask)
      .then((task) => {
        const tasksCopy = [...tasks];
        tasksCopy.push(task);
        setTasks(tasksCopy);
        setAddTaskModalOpen(false);
        toast.success("Your task has been added successfully");
      })
      .catch((err) => {
        toast.error(err.message);
      })
      .finally(()=>dispatch(setLoader(false)));;
  };

  const deleteTask = (taskID) => {
    dispatch(setLoader(true));
    taskApi
      .deleteIdenticalTask(taskID)
      .then(() => {
        const newTasks = tasks.filter((task) => task._id !== taskID);
        setTasks(newTasks);

        if (selectedTasks.has(taskID)) {
          const newSelectedTasks = new Set(selectedTasks);
          newSelectedTasks.delete(taskID);
          setSelectedTasks(newSelectedTasks);
        }
        toast.success("The task has been deleted successfully!");
      })
      .catch((err) => {
        toast.error(err.message);
      })
      .finally(()=>dispatch(setLoader(false)));;
  };

  const deleteSelectedTasks = () => {
    dispatch(setLoader(true));
    taskApi
      .deleteSelectedTasks([...selectedTasks])
      .then(() => {
       
        const savedTasks = [];
        const deletedTasksCount = selectedTasks.size;
        tasks.forEach((task) => {
          if (!selectedTasks.has(task._id)) {
            savedTasks.push(task);
          }
        });

        setTasks(savedTasks);
        setSelectedTasks(new Set());
        toast.success(`${deletedTasksCount} have been deleted successfully`);
      })
      .catch((err) => {
        toast.error(err.message);
      })
      .finally(()=>dispatch(setLoader(false)));;
  };

  const checkedTasks = (_id) => {
    const selectedTasksCopy = new Set(selectedTasks);

    if (selectedTasksCopy.has(_id)) {
      selectedTasksCopy.delete(_id);
      setSelectedTasks(selectedTasksCopy);
    } else {
      selectedTasksCopy.add(_id);
    }
    setSelectedTasks(selectedTasksCopy);
  };

  const updateTask = (taskForEditing) => {
    dispatch(setLoader(true));
    taskApi
      .update(taskForEditing)
      .then((taskForEditing) => {
        const tasksCopy = [...tasks];
        const taskIndex = tasksCopy.findIndex(
          (task) => task._id === taskForEditing._id
        );

        const updated = tasksCopy.map((task, index) => {
          if (index === taskIndex) {
            task.title = taskForEditing.title;
            task.description = taskForEditing.description;
            task.status = taskForEditing.status;
            task.date = taskForEditing.date;
          }

          return task;
        });

        setTasks(updated);

        toast.success(`Task has been updated successfully`);
        setEditableTask(null);
      })

      .catch((err) => {
        toast.error(err.message);
      })
      .finally(()=>dispatch(setLoader(false)));;
  };

  return (
    <Container className={styles.toDoContainer}>
      <Row>
        <Col className="heading mt-5">
          <p className="text-center mt-4 fs-1">
            Hello {userName}. What are our goals for today?
          </p>

          <div className={styles.circleButtonPosition}>
            <div className={styles.buttonWrapper}>
              <button
                className={styles.circleButton}
                id="button-addon2"
                onClick={() => setAddTaskModalOpen(true)}
              >
                <span className={styles.buttonText}>+ Add</span>
              </button>
            </div>
          </div>

          <SearchAndFilter
            searchFilteredTasks={getInitialTasks}
            getInitialTasks={getInitialTasks}
          />
          {isAddTaskModalOpen && (
            <TaskModal
              onCancel={() => {
                setAddTaskModalOpen(false);
              }}
              onSave={addTaskTemplate}
              deadline={deadline}
              onChange={setDeadline}
            />
          )}

          {editableTask && (
            <TaskModal
              onCancel={() => {
                setEditableTask(null);
              }}
              onSave={updateTask}
              data={editableTask}
            />
          )}
        </Col>
      </Row>
      <Row>
        <TaskCounter tasks={tasks} />
      </Row>

      <Row>
        {tasks.map((task, index) => {
          return (
            <Task
              data={task}
              key={task._id}
              onDeleteTask={(_id) => {
                setTaskToDelete(_id);
              }}
              onSelecteTasks={checkedTasks}
              isChecked={selectedTasks.has(task._id)}
              onTaskEdit={setEditableTask}
              number={index + 1}
              onChangeStatus={updateTask}
            />
          );
        })}

        <DeleteSelected
          disabled={!selectedTasks.size}
          taskCount={selectedTasks.size}
          onConfirmDelete={deleteSelectedTasks}
          tasks={tasks}
          setSelectedTasks={setSelectedTasks}
        />
      </Row>

      {taskToDelete && (
        <ConfirmDialog
          isOpen={taskToDelete}
          taskCount={1}
          confirmCancellation={() => {
            setTaskToDelete(null);
          }}
          onConfirmDelete={() => {
            deleteTask(taskToDelete);
            setTaskToDelete(null);
          }}
        />
      )}
    </Container>
  );
};

export default memo(ToDo);
