
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import TaskAPI from "../../API/TaskAPI";
const taskApi = new TaskAPI();




const NavTask = ()=>{
  // const navigate = useNavigate()
  //   const { taskID } = useParams();
  //   const [task, setTask] = useState(null);



  //   useEffect(() => {
  //     taskApi
  //       .getSingle(taskID)
  //       .then((task) => {
  //         navigate("/task/:taskID")
  //         setTask(task);
  //       })
  //       .catch((err) => {
  //         toast.error(err.message);
  //       });
  //   }, );
  
  
    
        
}

export default NavTask