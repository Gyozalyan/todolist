import { useState,useEffect, useMemo } from "react";
import { Col, Container, Row, InputGroup, Form, Button } from "react-bootstrap";
import styles from "./todo.module.css";
import Task from "../Task/Task";
import MySelect from "../Select/MySelect";
// import { creationDate } from "../Date";
import DeleteSelected from "../DeleteSelected/DeleteSelected";
import ConfirmDialog from "../ConfirmDialogDelete/ConfirmDialog";
import TaskAPI from "../../API/TaskAPI";


const taskApi = new TaskAPI();

export default function ToDo() {
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [selectedTasks, setSelectedTasks] = useState(new Set());
  const [filterTasksBy, setFilterTasksBy] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [taskToDelete, setTaskToDelete] = useState(null);

  useEffect(() => {
    taskApi.get().then((tasks) => {
      setTasks(tasks);
    });
  }, []);

  const getTitleValue = (event) => {

    setTaskTitle(event.target.value);
  };

  const getTaskDescriptionValue = (event) => {
    setTaskDescription(event.target.value);
  };

  const addTaskTemplate = () => {
    const trimmedTitle = taskTitle.trim()
    const trimmedDescription = taskDescription.trim()

    if (taskTitle === "") {
      return;
    }

    const newTask = {
      title: trimmedTitle,
      description: trimmedDescription,
    };

    taskApi.add(newTask).then((task) => {
      const tasksCopy = [...tasks];
      tasksCopy.push(task);
      setTasks(tasksCopy);
      setTaskTitle("");
      setTaskDescription("");
    });
  };

  const handleEvent = (event) => {
    if (event.key === "Enter") {
      addTaskTemplate();
    }
  };

  const deleteTask = (_id) => {
    console.log(selectedTasks)
    const savedTasks = tasks.filter((task) => {
      return task._id !== _id;
    });
    setTasks(savedTasks);

    const updatedState = {
      tasks: savedTasks,
    };

    if (selectedTasks.has(_id)) {
      const selectedTasksCopy = new Set(selectedTasks);
      selectedTasksCopy.delete(_id);
      setSelectedTasks(updatedState);
    }
  };

  const deleteSelectedTasks = () => {
    const savedTasks = [];

    tasks.forEach((task) => {
      if (!selectedTasks.has(task._id)) {
        savedTasks.push(task);
      }
    });

    setTasks(savedTasks);
    setSelectedTasks(new Set());
  };

  const checkedTasks = (_id) => {
    console.log(selectedTasks)
    const selectedTasksCopy = new Set(selectedTasks);

    if (selectedTasksCopy.has(_id)) {
    
      selectedTasksCopy.delete(_id);
      setSelectedTasks(selectedTasksCopy);
    } else {
      selectedTasksCopy.add(_id);
    }
    setSelectedTasks(selectedTasksCopy)
  };

  const FilterTasksBy = (sortby) => {
    setFilterTasksBy(sortby);

    setTasks(
      tasks.sort((a, b) => {
        return a[sortby].localeCompare(b[sortby]);
      })
    );
  };

  const getSearchQuery = (event) => {
    setSearchQuery(event.target.value);
    setTasks(
      [...tasks].filter((task) => {
        return task.title.toLowerCase().includes(searchQuery.toLowerCase());
      })
    );
  };

  return (
    <Container>
      <Row>
        <Col className="heading mt-5">
          <p className="text-center mt-4 fs-1">
            Hello Tamara. What are we going to succeed today?
          </p>

          <InputGroup className={styles.inputName}>
            <Form.Control
              type="text"
              placeholder="Please type the name of the task"
              aria-describedby="basic-addon2"
              onChange={getTitleValue}
              onKeyDown={handleEvent}
              value={taskTitle}
            />
          </InputGroup>

          <InputGroup className={styles.inputName}>
            <Form.Control
              type="text"
              placeholder="Please type the description of the task"
              aria-describedby="basic-addon2"
              value={taskDescription}
              onChange={getTaskDescriptionValue}
            />

            <Button
              variant="success"
              id="button-addon2"
              onClick={addTaskTemplate}
              disabled={!taskTitle}
            >
              +Add
            </Button>
          </InputGroup>

          <div className={styles.filterAndSearch}>
            <MySelect
              defaultValue="Filter tasks by"
              filterBy={[
                { name: "Name", value: "title" },
                { name: "Description", value: "taskDescription" },
                { name: "Date", value: "date" },
              ]}
              value={filterTasksBy}
              onChange={FilterTasksBy}
            />

            <input
              className={searchQuery}
              placeholder="Search task..."
              value={searchQuery}
              onChange={getSearchQuery}
            ></input>
          </div>
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
              number={index + 1}
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
          cancellation={() => {
            setTaskToDelete(null);
          }}
          confirmDelete={() => {
            deleteTask(taskToDelete);
            setTaskToDelete(null);
          }}
        />
      )}
    </Container>
  );
}
