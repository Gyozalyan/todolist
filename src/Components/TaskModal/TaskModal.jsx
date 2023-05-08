import { useState, useEffect, memo } from "react";
import { InputGroup, Form, Button, Modal } from "react-bootstrap";
import { formatDate } from "../../utils/helpers";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./TaskModal.module.css";
import "react-toastify/dist/ReactToastify.css";
import PropTypes from "prop-types";

 function TaskModal({ onCancel, onSave, data }) {
  const [title, setTitle] = useState(" ");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState(new Date());
  const [isTitleValid, setTitleValid] = useState(false);

  useEffect(() => {
    if (data) {
      setTitle(data.title);
      setDescription(data.description);
      setDeadline(new Date(data.date));
      setTitleValid(true)
  
    }
     // eslint-disable-next-line
  }, []);

  const onSaveTask = () => {
    const newTask = {
      title: title.trim(),
      description: description.trim(),
      date: formatDate(deadline),
    };

    if (data) {
      newTask._id = data._id;
    }

    onSave(newTask);
  };

  const onTitleChange = (event) => {
    const { value } = event.target;
    const trimmedTitle = value.trim();
    setTitleValid(trimmedTitle);
    setTitle(value);

 
  };

  const handleEventEnter = (event) => {
    if (event.key === "Enter") {
      onSaveTask()
    }
  };

  return (
    <Modal size="lg" show={true} onHide={onCancel} >
      <div className="modalContent">
      <Modal.Header>
        <Modal.Title> {data ? 'Update task' : "Add new Task"} </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <InputGroup className={styles.inputName}>
          <Form.Control
            as="textarea"
            rows={1}
            className={!isTitleValid ? styles.invalid : ""}
            placeholder="Task title"
            aria-describedby="basic-addon2"
            onChange={onTitleChange}
            onKeyDown={handleEventEnter}
            value={title}
          />
        </InputGroup>

        <InputGroup className={styles.inputName}>
          <Form.Control
            as="textarea"
            rows={5}
            placeholder="Task description"
            aria-describedby="basic-addon2"
            value={description}
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          />
        </InputGroup>
        <h6 className="mt-3">Set the deadline:</h6>
        <DatePicker
          showIcon
          selected={deadline}
          onChange={setDeadline}
          className="mt-1"
        />
      </Modal.Body>

      <Modal.Footer>
        <Button variant="success" disabled={title === "" ? isTitleValid : !isTitleValid} onClick={onSaveTask}>
          Save
        </Button>
        <Button variant="warning" onClick={onCancel}>
          Cancel
        </Button>
      </Modal.Footer>
      </div>
    </Modal>
  );
}

TaskModal.propTypes = {
  onCancel: PropTypes.func.isRequired,
  data: PropTypes.object,
};


export default memo(TaskModal)