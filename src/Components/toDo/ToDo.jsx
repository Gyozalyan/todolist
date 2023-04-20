import { useState, useEffect } from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
// import styles from "./todo.module.css";
import "react-toastify/dist/ReactToastify.css";
import Task from "../Task/Task";
import DeleteSelected from "../DeleteSelected/DeleteSelected";
import ConfirmDialog from "../ConfirmDialogDelete/ConfirmDialog";
import TaskAPI from "../../API/TaskAPI";
import TaskModal from "../TaskModal/TaskModal";
import { ToastContainer, toast } from "react-toastify";
import SearchAndFilter from "../SearchAndFilter/SearchAndFilter";

const taskApi = new TaskAPI();

export default function ToDo() {
  const [name] = useState("");
  const [tasks, setTasks] = useState([]);
  const [selectedTasks, setSelectedTasks] = useState(new Set());
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [isAddTaskModalOpen, setAddTaskModalOpen] = useState(false);
  const [editableTask, setEditableTask] = useState(null);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    taskApi
      .getAllTasks()
      .then((tasks) => {
        setTasks(tasks);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, []);

  const addTaskTemplate = (newTask) => {
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
        console.log("err", err);
        toast.error(err.message);
      });
  };

  const deleteTask = (taskID) => {
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
      });
  };

  const deleteSelectedTasks = () => {
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
        console.log("err", err);
        toast.error(err.message);
      });
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
    taskApi
      .update(taskForEditing)

      .then((task) =>  console.log("task", task))

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
          }

          return task;
        });

        setTasks(updated);

        toast.success(`Task has been updated successfully`);
        setEditableTask(null);
      })

      .catch((err) => {
        console.log("err", err);
        toast.error(err.message);
      });
  };

  const searchTask = (tasks) => {
    taskApi.searchTasks(tasks).then((tasks) => {
      const filteredTasks = [...tasks].filter((task) =>
        task.title.toLowerCase().includes(searchValue.toLowerCase()) || task.description.toLowerCase().includes(searchValue.toLowerCase())
      );

      setTasks(filteredTasks);
    })
    .catch((err) => {
      console.log("err", err);
      toast.error(err.message);
    });
  };
  return (
    <Container>
      <Row>
        <Col className="heading mt-5">
          <p className="text-center mt-4 fs-1">
            Hello {name}. What are we going to succeed today?
          </p>

          <SearchAndFilter
            searchTask={() => searchTask(tasks)}
            value={searchValue}
            onChange={(targetVal) => setSearchValue(targetVal)}
          />
          <Button
            variant="success"
            id="button-addon2"
            onClick={() => setAddTaskModalOpen(true)}
            // disabled={!taskTitle}
          >
            +Add
          </Button>
          <Button
            variant="danger"
            id="button-addon2"
            onClick={() => {
              const taskIDs = tasks.map((task) => task._id);
              setSelectedTasks(new Set(taskIDs));
            }}
          >
            Select All
          </Button>
          <Button
            id="button-addon2"
            variant="primary"
            onClick={() => setSelectedTasks(new Set())}
          >
            Reset
          </Button>

          {isAddTaskModalOpen && (
            <TaskModal
              onCancel={() => {
                setAddTaskModalOpen(false);
              }}
              onSave={addTaskTemplate}
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

      <div>
        {tasks.map((task, index) => {
          return (
            <Task
              data={task}
              key={task._id}
              deleteTask={(_id) => {
                setTaskToDelete(_id);
              }}
              selecteTasks={checkedTasks}
              checked={selectedTasks.has(task._id)}
              taskEdit={setEditableTask}
              number={index + 1}
              changeStatus={updateTask}
            />
          );
        })}
      </div>

      <DeleteSelected
        disabled={!selectedTasks.size}
        taskCount={selectedTasks.size}
        confirmDelete={deleteSelectedTasks}
      />

      {taskToDelete && (
        <ConfirmDialog
          isOpen={taskToDelete}
          taskCount={1}
          confirmCancellation={() => {
            setTaskToDelete(null);
          }}
          confirmDelete={() => {
            deleteTask(taskToDelete);
            setTaskToDelete(null);
          }}
        />
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
    </Container>
  );
}
