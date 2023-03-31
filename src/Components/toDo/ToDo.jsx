import { Component } from "react";
import styles from "./todo.module.css";
import { Col, Container, Row, InputGroup, Form, Button } from "react-bootstrap";
import Task from "../task/Task";
import { idGenerator } from "../../Utils/Helper";
import ConfirmDialog from "../ConfirmDialog";

export default class ToDo extends Component {
  state = {
    tasks: [],
    newText: "",
    body:"",
    selectedTasks: new Set(),
    openModal:false
  };

  getValueTitle = (event) => {
    const newText = event.target.value.trim();
    this.setState({
      newText,
    
    });
  };
  getValueBody = (event) => {

  
    const body = event.target.value.trim();
    this.setState({
      body:body
    
    });

  };

  addTemplate = () => {
    if (this.state.newText === "") {
      return;
    }

    const tasks = [...this.state.tasks];
    tasks.push({
      id: idGenerator(),
      title: this.state.newText,
      body: this.state.body,
    });

    this.setState({
      tasks,
      newText: "",
      body:""
    });
  };

  handleEvent = (event) => {
    if (event.key === "Enter") {
      this.addTemplate();
    }
  };

  deleteTask = (id) => {
    const { tasks, selectedTasks } = this.state;
    const savedTasks = tasks.filter((task) => {
      return task.id !== id;
    });

    const updatedState = {
      tasks: savedTasks,
    };

    if (selectedTasks.has(id)) {
      const selectedTasksCopy = new Set(selectedTasks);
      selectedTasksCopy.delete(id);
      updatedState.selectedTasks = selectedTasksCopy;
    }

    this.setState(updatedState);
  };

  deleteSelectedTasks = () => {
    const { tasks, selectedTasks } = this.state;
    const savedTasks = [];

    tasks.forEach((task) => {
      if (!selectedTasks.has(task.id)) {
        savedTasks.push(task.id);
      }
    });

    this.setState({
      tasks: savedTasks,
      selectedTasks: new Set(),
      openModal:false
    });
  };

  checkedTasks = (id) =>{
    const selectedTasksCopy = new Set(this.state.selectedTasks);
    if (selectedTasksCopy.has(id)) {
      selectedTasksCopy.delete(id);
    } else {
      this.setState({
        selectedTasks: selectedTasksCopy.add(id),
      });
    }

  }

  isShown=()=>{
   this.setState({
    openModal: true
  })}
  
  toCancel=()=>{
    this.setState({
      openModal:false
    })
  }

  render() {
    const taskJsx = this.state.tasks.map((task, index) => {
      return (
        <Task
          data={task}
          key={task.id}
          deleteTask={this.deleteTask}
          selecteTasks={this.checkedTasks}
          number = {index+1}
        />
      );
    });


    return (
      <Container>
        <Row>
          <Col className="heading mt-5">
            <p className="text-center mt-4 fs-1">
              Hello Tamara. What are we going to success today?
            </p>

            <InputGroup className={styles.inputName}>
              <Form.Control              
                type="text"
                placeholder="Please type the name of the task"
                aria-describedby="basic-addon2"
                onChange={this.getValueTitle}
                onKeyDown={this.handleEvent}
                value={this.state.newText}
              />
               </InputGroup>

              <InputGroup className={styles.inputName}>
              <Form.Control
                type="text"
                placeholder="Please type the description of the task"
                aria-describedby="basic-addon2"
                value = {this.state.body}
                onChange ={this.getValueBody}

              />
        
              <Button
                variant="success"
                id="button-addon2"
                onClick={this.addTemplate}
                disabled={!this.state.newText}
              >
                +Add
              </Button>
            </InputGroup>
           
          </Col>
        </Row>
        <Row>
          <Col>
            <Button
              variant="danger"
              className={styles.deleteselected}
              onClick={this.isShown}
              disabled={this.state.selectedTasks.size === 0}
            >
              Delete Selected
            </Button>
          </Col>
        </Row>

        <Row>{taskJsx}</Row>
        <ConfirmDialog 
        taskCount = {this.state.selectedTasks.size}
        isOpen = {this.state.openModal}
        confirmDelete = {this.deleteSelectedTasks}
        cancellation = {this.toCancel}
        />
      </Container>
    );
  }
}
