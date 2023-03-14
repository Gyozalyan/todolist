import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { Component } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Task from "./Task";


export default class ToDo extends Component {

state={
  tasks:[],
  counter:0
}

template =()=>{

  const task = [...this.state.tasks]
  task.push(this.state.counter)
  this.setState({
    task,
   counter: this.state.counter+1
  })


  }

    render() {

      const taskJsx  = this.state.tasks.map((task)=>{
        return(<Task/>)
      })


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
            />
            <Button variant="success" id="button-addon2" onClick={this.template}>
              +Add
            </Button>
          </InputGroup>
        </Col>
        </Row>
        <Row className="mt-5">
         {taskJsx}
        </Row>
        </Container>
      );
    }
  }