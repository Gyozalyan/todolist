import { Button, Modal } from 'react-bootstrap'

function ConfirmDialog({ isOpen, confirmDelete, cancellation, taskCount }) {
  return !isOpen ? null : (
    <Modal size="sm" show={isOpen} onHide={() => {cancellation()}}>
      <Modal.Header>
        <Modal.Title> </Modal.Title>
      </Modal.Header>

      <Modal.Body>Are you sure you want to delete {taskCount!==0? taskCount : null} {taskCount>1?"tasks":'task'}?</Modal.Body>

      <Modal.Footer>
        <Button variant="danger" onClick={confirmDelete}>
          Yes
        </Button>
        <Button variant="success" onClick={cancellation}>
          No
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ConfirmDialog
