import { useState, useEffect } from "react";
import { Button, Modal } from 'react-bootstrap'



export default function TaskModal() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  
  return (
    <Modal size="sm" show={false} onHide={() => {confirmCancellation()}}>
      <Modal.Header>
        <Modal.Title> Add new Task </Modal.Title>
      </Modal.Header>

      <Modal.Body>Are you sure you want to delete {taskCount!==0? taskCount : null} {taskCount>1?"tasks":'task'}?</Modal.Body>

      <Modal.Footer>
        <Button variant="success" onClick={confirmDelete}>
          Yes
        </Button>
        <Button variant="warning" onClick={confirmCancellation}>
          No
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
