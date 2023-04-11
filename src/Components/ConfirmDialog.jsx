import {Button, Modal} from 'react-bootstrap';

function ConfirmDialog({isOpen, confirmDelete, cancellation}) {

return !isOpen ? null :  (

      <Modal
 
      size = "sm"
      show={isOpen}
      onHide={()=>{}}>
        <Modal.Header >
          <Modal.Title> </Modal.Title>
        </Modal.Header>

        <Modal.Body>
        Are you sure you want to delete the task?
       
        </Modal.Body>

        <Modal.Footer>
        <Button variant="danger" onClick = {confirmDelete}>Yes</Button>
          <Button variant="success" onClick = {cancellation}>No</Button>
        </Modal.Footer>
      </Modal>

  );

}

export default ConfirmDialog;