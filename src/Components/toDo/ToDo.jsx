import { useState } from "react";
import { Col, Container, Row, InputGroup, Form, Button } from "react-bootstrap";
import { idGenerator } from "../../Utils/Helper";
import styles from "./todo.module.css";
import Task from "../Tasks/Task";
import ConfirmDialog from "../ConfirmDialogDelete/ConfirmDialog";
import MySelect from "../Select/MySelect";
import { creationDate } from "../Date";

export default function ToDo() { 

  const [tasks, setTasks] = useState([])
    const [newText, setNewText] = useState("")
    const [body, setBody] = useState("")
    const [selectedTasks, setSelectedTasks] = useState(new Set())
    const [openModal, setOpenModal] = useState(false)
    // const [filterTasksBy, setFilterTasksBy] = useState("")
    // const [searchQuery, setSearchQuery] = useState("")


    // getSearchQuery = (event) => {
    //   const searchQuery = event.target.value;

    //   this.setState({ 
    //     searchQuery,
    //     tasks: [...this.state.tasks].filter((task)=>{
    //       return task.title.toLowerCase().includes(this.state.searchQuery.toLowerCase())})
    //   });



    //  };

  const getValueTitle = (event) => {
    const newText = event.target.value.trim();

    setNewText(newText)

  };

  const getValueBody = (event) => {
    const body = event.target.value.trim();
    setBody(body)

  };

  const addTemplate = () => {
    if (newText === "") {
      return;
    }

    const tasksCopy = [...tasks];
    tasksCopy.push({
      id: idGenerator(),
      title: newText,
      body: body,
      date: creationDate(),
    });


    setTasks(tasksCopy)
    setNewText("")
    setBody("")

  };

  const handleEvent = (event) => {
    if (event.key === "Enter") {
      this.addTemplate();
    }
  };

  const deleteTask = (id) => {

    const savedTasks = tasks.filter((task) => {
      return task.id !== id;
    });
    setTasks(savedTasks)

    const updatedState = {
      tasks: savedTasks,
    };

    if (selectedTasks.has(id)) {
      const selectedTasksCopy = new Set(selectedTasks);
      selectedTasksCopy.delete(id);
      setSelectedTasks(updatedState)
    }

    ;
  };

  const deleteSelectedTasks = () => {

    const savedTasks = [];

    tasks.forEach((task) => {
      if (!selectedTasks.has(task.id)) {
        savedTasks.push(task.id);
      }
    });


    setTasks(savedTasks)
    setSelectedTasks(new Set())
    setOpenModal(false)

  };

  const checkedTasks = (id) => {
    const selectedTasksCopy = new Set(selectedTasks);
    if (selectedTasksCopy.has(id)) {
      selectedTasksCopy.delete(id);
    } else {

      setSelectedTasks(selectedTasksCopy.add(id))

    }
  };

  const isShown = () => {
    setOpenModal(true)

  };

  const toCancel = () => {
    setOpenModal(false)
  };

  // const filterTasks = (sortby) => {

  //   this.setState({
  //     tasks: this.state.tasks.sort((a, b) => {
  //       return a[sortby].localeCompare(b[sortby]);
  //     }),
  //     filterTasksBy: sortby,
  //   });
  // };


 const taskJsx = tasks.map((task, index) => {
  return (
    <Task
      data={task}
      key={task.id}
      deleteTask={deleteTask}
      selecteTasks={checkedTasks}
      number={index + 1}
    />
  );
 });

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
            onChange={getValueTitle}
            onKeyDown={handleEvent}
            value={newText}
          />
        </InputGroup>

        <InputGroup className={styles.inputName}>
          <Form.Control
            type="text"
            placeholder="Please type the description of the task"
            aria-describedby="basic-addon2"
            value={body}
            onChange={getValueBody}
          />

          <Button
            variant="success"
            id="button-addon2"
            onClick={addTemplate}
            disabled={!newText}
          >
            +Add
          </Button>
        </InputGroup>

        {/* <div className={styles.filterAndSearch}> */}
        {/* <MySelect */}
        {/* defaultValue="Filter tasks by" */}
        {/* filterBy={[ */}
        {/* { name: "Name", value: "title" }, */}
        {/* { name: "Description", value: "body" }, */}
        {/* { name: "Date", value: "date" }, */}
        {/* ]} */}
        {/* value={this.state.filterTasksBy} */}
        {/* onChange={this.filterTasks} */}
        {/* /> */}
        {/*  */}
        {/*  */}
        {/* <input */}
        {/* className={styles.search} */}
        {/* placeholder="Search task..." */}
        {/* value={this.state.value} */}
        {/* onChange={this.getSearchQuery}></input> */}
        {/*  */}
        {/*  */}
        {/*  */}
        {/* </div> */}


      </Col>
    </Row>
    <Row>
      <Col>
        <Button
          variant="danger"
          className={styles.deleteselected}
          onClick={isShown}
          disabled={selectedTasks.size === 0}
        >
          Delete Selected
        </Button>
      </Col>
    </Row>

    <Row>{taskJsx}</Row>
    <ConfirmDialog
      taskCount={selectedTasks.size}
      isOpen={openModal}
      confirmDelete={deleteSelectedTasks}
      cancellation={toCancel}
    />
  </Container>
);
}

    
  
   
