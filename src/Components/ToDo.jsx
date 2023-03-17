import { Component } from 'react'
import { Col, Container, Row, InputGroup, Form, Button } from 'react-bootstrap'
import Task from '../Components/Task'
import { idGenerator } from '../Utils/Helper'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'

export default class ToDo extends Component {
  state = {
    tasks: [],
    newText: '',
  }

  getValue = (event) => {
    const newText = event.target.value.trim()
    this.setState({
      newText,
    })
  }

  addTemplate = () => {
    if (this.state.newText === '') {
      return
    }

    const tasks = [...this.state.tasks]
    tasks.push({
      id: idGenerator(),
      text: this.state.newText,
    })

    this.setState({
      tasks,
      newText: '',
    })
  }

  handleEvent = (event) => {
    if (event.key === 'Enter') {
      this.addTemplate()
    }
  }

  deleteTask = (id) => {
    this.setState({
      tasks: this.state.tasks.filter((task) => {
        return task.id !== id
      }),
    })
  }

  render() {
    const taskJsx = this.state.tasks.map((task) => {
      return (
        <Task
        
          data={task}
          key={task.id}
          deleteTask={this.deleteTask}
        />
      )
    })

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
                value={this.state.newText}
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
        <Row>
          <Col  >
          <Button variant="danger" className="delete-selected mt-2 mb-3 "> Delete Selected </Button>  
          </Col>
        </Row>
        
        <Row>{taskJsx}</Row>
        
       
      </Container>
    )
  }
}
