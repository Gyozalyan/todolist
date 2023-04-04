import React, { useState } from "react";
import styles from "./task.module.css";
import { Col, Form, Card, Button } from "react-bootstrap";
import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPenToSquare } from "@fortawesome/free-solid-svg-icons";

export default function Task({ data, deleteTask, selecteTasks, number }) {
  return (
    <div className={styles.task}>
      
      <div className={styles.taskBackground}>
     
        <div className={styles.checkBody}>
        <div> {data.date}</div>
       
        
          <Form.Check
            className={styles.selectTask}
            onClick={() => {
              selecteTasks(data.id);
            }}
          />
             
          <div className={styles.taskContent}>
    
            <strong>
               {number}. {data.title}{" "}
            </strong>{" "}
            : {data.body}
          </div>
        </div>

        <div className={styles.actionButtons}>
          <Button
            variant="outline-danger"
            className="float-end btns"
            onClick={() => {
              deleteTask(data.id);
            }}
          >
            <FontAwesomeIcon icon={faTrashCan} />
          </Button>
          <Button
            variant="outline-warning"
            className="float-end btns"
            // onClick={makeTextEditable}
          >
            <FontAwesomeIcon icon={faPenToSquare} />
          </Button>
        </div>
      </div>
    </div>
  );

  // const ref = useRef(null)

  // const [valueOfTask, setVal] = useState(data.text)

  // const makeTextEditable = () => {
  //   ref.current.focus()
  // }

  // return (
  //   <Col lg={4} md={6} className="mt-5">
  //     <Card style={{ width: '18rem' }} className="makeCenter">
  //        <Form.Check className = {styles.selectTask}
  //         onClick={()=>{

  //          selecteTasks(data.id)

  //        }}/>

  //       <Card.Body>
  //         <Form.Control
  //           ref={ref}
  //           as="textarea"
  //           placeholder="Leave a comment here"
  //           className="mb-3"
  //           value={valueOfTask}
  //           onChange={(e) => {
  //             setVal(e.target.value)
  //           }}
  //         />
  //         <Button
  //           variant="outline-danger"
  //           className="float-end"
  //           onClick={() => {
  //             deleteTask(data.id)
  //           }}
  //         >
  //           <FontAwesomeIcon icon={faTrashCan} />
  //         </Button>
  //         <Button
  //           variant="outline-warning"
  //           className="float-end btns"
  //           onClick={makeTextEditable}
  //         >
  //           <FontAwesomeIcon icon={faPenToSquare} />
  //         </Button>
  //       </Card.Body>
  //     </Card>
  //   </Col>
  // )
}
