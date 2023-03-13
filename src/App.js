import "./App.css";
import { Component } from "react";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';




class App extends Component {
  render() {
    return (    
     
       <Container>
        <Row>
          <Col className="heading mt-5">
          <p class="text-center mt-4 fs-1">
              Hello Tamara. What are we going to success today?
            </p>

            <InputGroup className="mb-3">
        <Form.Control
         type="text"
          placeholder="Great job! Next one?"         
          aria-describedby="basic-addon2"
        />
        <Button variant="success" id="button-addon2">
          +Add
        </Button>
      </InputGroup>
          </Col>
        </Row>
        </Container>
        
       )
    
  }
}

export default App;
