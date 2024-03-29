import { Button, Modal } from "react-bootstrap";
import { PropTypes } from "prop-types";
import { memo } from "react";

function ConfirmDialog({
  isOpen,
  onConfirmDelete,
  confirmCancellation,
  taskCount,
}) {
  return isOpen ? (
    <Modal
      size="sm"
      show={true}
      onHide={confirmCancellation}
    >
      <Modal.Header>
        <Modal.Title> </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        Are you sure you want to delete {taskCount !== 0 ? taskCount : null}{" "}
        {taskCount > 1 ? "tasks" : "task"}?
      </Modal.Body>

      <Modal.Footer>
        <Button variant="danger" onClick={onConfirmDelete}>
          Yes
        </Button>
        <Button variant="success" onClick={confirmCancellation}>
          No
        </Button>
      </Modal.Footer>
    </Modal>
  ) : null;
}

ConfirmDialog.propTypes = {
  onConfirmDelete: PropTypes.func.isRequired,
  confirmCancellation: PropTypes.func.isRequired,
  taskCount: PropTypes.number.isRequired,
};

export default memo(ConfirmDialog);
