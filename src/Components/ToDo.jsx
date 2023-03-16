import { Component } from "react";
import {Col, Container, Row, InputGroup, Form, Button} from "react-bootstrap";
import Task from "../Components/Task";
import { idGenerator } from "../Utils/Helper";

export default class ToDo extends Component {
  state = {
    tasks: [],
    newText: "",

  };

  getValue = (event) => {
    const newText = event.target.value.trim()
    this.setState({
      newText,
    });


  };

  addTemplate = () => {
if(this.state.newText === ""){
  return
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

  handleEvent =(event)=>{
    if (event.key === 'Enter'){
      this.addTemplate()
    }
  }


  deleteTask=(currentTask)=>{
     this.setState({
      tasks: this.state.tasks.filter((task)=>{return task!==currentTask})
    })
  }


  render() {
    const taskJsx = this.state.tasks.map((task) => {
      return <Task taskObj={task} data={task.text} key={task.id} deleteTask={this.deleteTask} onChangeVal = {this.getValue}/>;
    });

    const isButtonDisabled = !this.state.newText

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
                value = {this.state.newText}
              />
              <Button
                variant="success"
                id="button-addon2"
                onClick={this.addTemplate}
                disabled={isButtonDisabled}
              >
                +Add
              </Button>
            </InputGroup>
          </Col>
        </Row>
        <Row>{taskJsx}</Row>
      </Container>
    );
  }
}
