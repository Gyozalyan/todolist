import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ToDo from "./ToDo";
import Task from "./Task";
import { Component } from "react";


class App extends Component {
  state = {
    templateArray: [],
  };

  render() {
    return (
      <Container>
        <Row >
          <ToDo />
        </Row>
        <Row >
        <Col className="mt-5" lg={4} md={6}>
          <Task />
        </Col> 
        <Col className="mt-5" lg={4} md={6}>
          <Task />
        </Col> 
        <Col className="mt-5" lg={4} md={6}>
          <Task />
        </Col> 
        <Col className="mt-5"lg={4} md={6}>
          <Task />
        </Col> 
        <Col className="mt-5" lg={4} md={6}>
          <Task />
        </Col> 
  
        
        </Row>
      </Container>
    );
  }
}



export default App;
