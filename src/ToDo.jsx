import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { Component } from "react";
import Col from "react-bootstrap/Col";


export default class ToDo extends Component {
    render() {
      return (
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
      );
    }
  }