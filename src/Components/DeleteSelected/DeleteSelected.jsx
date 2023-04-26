import ConfirmDialog from "../ConfirmDialogDelete/ConfirmDialog";
import styles from './DeleteSelected.module.css'
import { PropTypes } from "prop-types";
import { useState, memo } from "react";
import { Col, Row,  Button } from "react-bootstrap";


 const DeleteSelected = ({disabled, taskCount, onConfirmDelete, tasks, setSelectedTasks })=>{

    const [openModal, setOpenModal] = useState(false);


    const toggleConfirmDialog = () => {
        setOpenModal(!openModal);
      };

    return(
        <>
        <Row>
        <Col>
        <div className={styles.selectAllReset}>
      
            <Button
              variant="outline-secondary"
              id="button-addon2"
              onClick={() => {
                const taskIDs = tasks.map((task) => task._id)
                setSelectedTasks(new Set(taskIDs))
              }}
              className={styles.selectAll}
            >
              Select All
            </Button>

            <Button
              id="button-addon2"
              variant="outline-secondary"
              className={styles.clearSelection}
              onClick={() => setSelectedTasks(new Set())}
            >
              Clear selection
            </Button>
           
            <Button
            variant="danger"
            className={styles.deleteselected}
            onClick={toggleConfirmDialog}
            disabled={disabled}
          >
            Delete Selected
          </Button>
          </div>
          
        </Col>
      </Row>

     
      <ConfirmDialog
        taskCount={taskCount}
        isOpen={openModal}
        onConfirmDelete={()=>{
          onConfirmDelete();
            toggleConfirmDialog()
        }}

        confirmCancellation={toggleConfirmDialog}
      />
      </>
    )

}


DeleteSelected.propTypes= {
  disabled: PropTypes.bool.isRequired,
  taskCount:PropTypes.number.isRequired,
  onConfirmDelete:PropTypes.func.isRequired,
}
export default memo(DeleteSelected)