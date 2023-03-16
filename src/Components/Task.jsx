import React, { useState } from 'react'
import Input from 'react-bootstrap/InputGroup'
import { Col, Form, Card, Button } from 'react-bootstrap'
import { useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan, faPenToSquare } from '@fortawesome/free-solid-svg-icons'

export default function Task({ data, deleteTask }) {
  const ref = useRef(null)

  const [valueOfTask, setVal] = useState(data)

  let makeTextEditable = () => {
    ref.current.focus()
  }

  return (
    <Col lg={4} md={6} className="mt-5">
      <Card style={{ width: '18rem' }} className="makeCenter">
        <Input className="mb-3">
          <Input.Checkbox
            aria-label="Checkbox for following text input"
            className="inputCheckBox"
          />
        </Input>
        <Card.Body>
          <Form.Control
            ref={ref}
            as="textarea"
            placeholder="Leave a comment here"
            className="mb-3"
            value={valueOfTask}
            onChange={(e) => {
              setVal(e.target.value)
            }}
          />
          <Button
            variant="outline-danger"
            className="float-end"
            onClick={() => {
              deleteTask(data.id)
            }}
          >
            <FontAwesomeIcon icon={faTrashCan} />
          </Button>
          <Button
            variant="outline-warning"
            className="float-end btns"
            onClick={makeTextEditable}
          >
            <FontAwesomeIcon icon={faPenToSquare} />
          </Button>
        </Card.Body>
      </Card>
    </Col>
  )
}
