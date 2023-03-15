import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Input from 'react-bootstrap/InputGroup';
import { Col, Form, FloatingLabel } from 'react-bootstrap';


export default function Task(props){
return(
    <Col lg={4} md={6} className="mt-5">
    <Card style={{ width: '18rem' }} className="makeCenter" >
      <Input className="mb-3">
        <Input.Checkbox aria-label="Checkbox for following text input" className = 'inputCheckBox' />
      </Input>
    <Card.Body>
    <FloatingLabel
        controlId="floatingTextarea"
        label="Must do"
        className="mb-3"
      >
        <Form.Control as="textarea" placeholder="Leave a comment here" value={props.data}/>
      </FloatingLabel>
      <Button variant="outline-danger" className="float-end">Delete</Button>
      <Button variant="outline-success" className="float-end btns">Edit</Button>
    
    </Card.Body>
  </Card>
  </Col>
)

}

 