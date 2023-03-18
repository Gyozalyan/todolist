import {Button, Modal} from 'react-bootstrap';

function ConfirmDialog() {
 
  return (

      <Modal
      size = "sm"
      show={false}
      onHide={()=>{}}>
        <Modal.Header closeButton>
          <Modal.Title> </Modal.Title>
        </Modal.Header>

        <Modal.Body>
        Are you sure you want to delete the task?
       
        </Modal.Body>

        <Modal.Footer>
        <Button variant="danger">Yes</Button>
          <Button variant="success">No</Button>
        </Modal.Footer>
      </Modal>

  );

}

export default ConfirmDialog;