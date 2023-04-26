import ConfirmDialog from "../ConfirmDialogDelete/ConfirmDialog";
import styles from './DeleteSelected.module.css'
import { PropTypes } from "prop-types";
import { useState, memo } from "react";
import { Col, Row,  Button } from "react-bootstrap";


 const DeleteSelected = ({disabled, taskCount, onConfirmDelete, })=>{

    const [openModal, setOpenModal] = useState(false);


    const toggleConfirmDialog = () => {
        setOpenModal(!openModal);
      };

    return(
        <>
        <Row>
        <Col>
          <Button
            variant="danger"
            className={styles.deleteselected}
            onClick={toggleConfirmDialog}
            disabled={disabled}
          >
            Delete Selected
          </Button>
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