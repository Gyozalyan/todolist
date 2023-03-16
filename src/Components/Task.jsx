import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Input from 'react-bootstrap/InputGroup';
import { Col, Form, FloatingLabel } from 'react-bootstrap';
import React, { useState } from 'react';
import {useRef} from 'react';


export default function Task({taskObj,data, deleteTask,}){
  const ref = useRef(null);

  const [valueOfTask, setVal] = useState(data)
  
   let makeTextEditable = () =>{
    ref.current.focus();
   

  }


return(
    <Col lg={4} md={6} className="mt-5">
    <Card style={{ width: '18rem' }} className="makeCenter" >
      <Input className="mb-3">
        <Input.Checkbox aria-label="Checkbox for following text input" className = 'inputCheckBox' />
      </Input>
    <Card.Body>
    <FloatingLabel
    id="foo"
        controlId="floatingTextarea"
        className="mb-3"
      >
        <Form.Control  ref={ref}  as="textarea" placeholder="Leave a comment here" value={valueOfTask} onChange ={(e)=>{setVal(e.target.value)}} />
      </FloatingLabel>
      <Button variant="outline-danger" className="float-end" onClick = {()=>{deleteTask(taskObj)}}>Delete</Button>
      <Button variant="outline-success" className="float-end btns" onClick = {makeTextEditable}>Edit</Button>
    
    </Card.Body>
  </Card>
  </Col>
)

}

 