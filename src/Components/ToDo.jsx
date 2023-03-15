import { Component } from "react";
import {Col, Container, Row, InputGroup, Form, Button} from "react-bootstrap";
import Task from "../Task";
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

  render() {
    const taskJsx = this.state.tasks.map((task) => {
      console.log(task.newText);
      return <Task data={task.text} key={task.id} />;
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
