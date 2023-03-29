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
    selectedTasks: new Set(),
    openModal:false
  };

  getValue = (event) => {
    const newText = event.target.value.trim();
    this.setState({
      newText,
    });
  };

  addTemplate = () => {
    if (this.state.newText === "") {
      return;
    }

    const tasks = [...this.state.tasks];
    tasks.push({
      id: idGenerator(),
      text: this.state.newText,
    });

    this.setState({
      tasks,
      newText: "",
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
    const taskJsx = this.state.tasks.map((task) => {
      return (
        <Task
          data={task}
          key={task.id}
          deleteTask={this.deleteTask}
          selecteTasks={this.checkedTasks}
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

            <InputGroup className="mb-3">
              <Form.Control
                type="text"
                placeholder="Great job! Next one?"
                aria-describedby="basic-addon2"
                onChange={this.getValue}
                onKeyDown={this.handleEvent}
                value={this.state.newText}
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
              // onClick={this.deleteSelectedTasks}
              onClick={this.isShown}
              disabled={this.state.selectedTasks.size === 0}
            >
              Delete Selected
            </Button>
          </Col>
        </Row>

        <Row>{taskJsx}</Row>
        <ConfirmDialog 
        isOpen = {this.state.openModal}
        confirmDelete = {this.deleteSelectedTasks}
        cancellation = {this.toCancel}
        />
      </Container>
    );
  }
}
