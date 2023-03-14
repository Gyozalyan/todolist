import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Input from 'react-bootstrap/InputGroup';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';



export default function Task(){
return(
    
    <Card style={{ width: '18rem' }} className="makeCenter">
      <Input className="mb-3">
        <Input.Checkbox aria-label="Checkbox for following text input" className = 'inputCheckBox' />
      </Input>
    <Card.Body>
    <FloatingLabel
        controlId="floatingTextarea"
        label="Must do"
        className="mb-3"
      >
        <Form.Control as="textarea" placeholder="Leave a comment here" />
      </FloatingLabel>
      <Button variant="outline-danger" className="float-end">Delete</Button>
      <Button variant="outline-success" className="float-end btns">Edit</Button>
    
    </Card.Body>
  </Card>
 
)

}

 