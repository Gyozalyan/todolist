import styles from './todo.module.css'
import Task from '../Task/Task'
import DeleteSelected from '../DeleteSelected/DeleteSelected'
import ConfirmDialog from '../ConfirmDialogDelete/ConfirmDialog'
import TaskAPI from '../../API/TaskAPI'
import TaskModal from '../TaskModal/TaskModal'
import 'react-toastify/dist/ReactToastify.css'
import SearchAndFilter from '../SearchAndFilter/SearchAndFilter'
import TaskCounter from '../TaskCounter/TaskCounter'
import { useState, useEffect, memo } from 'react'
import { Col, Container, Row, Button } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify'



const taskApi = new TaskAPI()

 const ToDo =({userName}) => {
  const [name] = useState('')
  const [tasks, setTasks] = useState([])
  const [selectedTasks, setSelectedTasks] = useState(new Set())
  const [taskToDelete, setTaskToDelete] = useState(null)
  const [isAddTaskModalOpen, setAddTaskModalOpen] = useState(false)
  const [editableTask, setEditableTask] = useState(null)
  const [deadline, setDeadline] = useState(new Date())

  const getInitialTasks = (filters) => {
    taskApi
      .getAllTasks(filters)
      .then((tasks) => {
        setTasks(tasks)
      })
      .catch((err) => {
        toast.error(err.message)
      })
  }

  useEffect(() => {
    getInitialTasks()
  }, [])

  const addTaskTemplate = (newTask) => {
    taskApi
      .addTask(newTask)
      .then((task) => {
        const tasksCopy = [...tasks]
        tasksCopy.push(task)
        setTasks(tasksCopy)
        setAddTaskModalOpen(false)
        toast.success('Your task has been added successfully')
      })
      .catch((err) => {
        toast.error(err.message)
      })
  }


  const deleteTask = (taskID) => {
    taskApi
      .deleteIdenticalTask(taskID)
      .then(() => {
        const newTasks = tasks.filter((task) => task._id !== taskID)
        setTasks(newTasks)

        if (selectedTasks.has(taskID)) {
          const newSelectedTasks = new Set(selectedTasks)
          newSelectedTasks.delete(taskID)
          setSelectedTasks(newSelectedTasks)
        }
        toast.success('The task has been deleted successfully!')
      })
      .catch((err) => {
        toast.error(err.message)
      })
  }

  const deleteSelectedTasks = () => {
    taskApi
      .deleteSelectedTasks([...selectedTasks])
      .then(() => {
        const savedTasks = []
        const deletedTasksCount = selectedTasks.size
        tasks.forEach((task) => {
          if (!selectedTasks.has(task._id)) {
            savedTasks.push(task)
          }
        })

        setTasks(savedTasks)
        setSelectedTasks(new Set())
        toast.success(`${deletedTasksCount} have been deleted successfully`)
      })
      .catch((err) => {
        toast.error(err.message)
      })
  }

  const checkedTasks = (_id) => {
    const selectedTasksCopy = new Set(selectedTasks)

    if (selectedTasksCopy.has(_id)) {
      selectedTasksCopy.delete(_id)
      setSelectedTasks(selectedTasksCopy)
    } else {
      selectedTasksCopy.add(_id)
    }
    setSelectedTasks(selectedTasksCopy)
  }

  const updateTask = (taskForEditing) => {
    taskApi
      .update(taskForEditing)
      .then((taskForEditing) => {
        const tasksCopy = [...tasks]
        const taskIndex = tasksCopy.findIndex(
          (task) => task._id === taskForEditing._id,
        )

        const updated = tasksCopy.map((task, index) => {
          if (index === taskIndex) {
            task.title = taskForEditing.title
            task.description = taskForEditing.description
            task.status = taskForEditing.status
            task.date = taskForEditing.date
          }

          return task
        })

        setTasks(updated);

        toast.success(`Task has been updated successfully`);
        setEditableTask(null);
      })

      .catch((err) => {
        toast.error(err.message);
      })
  }

  return (
    <Container className={styles.toDoContainer}>
      <Row>
     
        <Col className="heading mt-5">
          <p className="text-center mt-4 fs-1">
            Hello {userName}. What are our goals for today?
          </p>

          <div className={styles.circleButtonPosition}>
            <div className={styles.buttonWrapper}>
              <button
                className={styles.circleButton}
                id="button-addon2"
                onClick={() => setAddTaskModalOpen(true)}
              >
                <span className={styles.buttonText}>+ Add</span>
              </button>
            </div>
          </div>

          <SearchAndFilter
            searchFilteredTasks={getInitialTasks}
            getInitialTasks={getInitialTasks}
          
          />
          {isAddTaskModalOpen && (
            <TaskModal
              onCancel={() => {
                setAddTaskModalOpen(false)
              }}
              onSave={addTaskTemplate}
              deadline={deadline}
              onChange={setDeadline}
            />
          )}

          {editableTask && (
            <TaskModal
              onCancel={() => {
                setEditableTask(null)
              }}
              onSave={updateTask}
              data={editableTask}
            />
          )}
        </Col>
      </Row>
      <Row>
      <TaskCounter
      tasks = {tasks}
      />
      </Row>

      <Row>
      {tasks.map((task, index) => {
          return (
            <Task
              data={task}
              key={task._id}
              onDeleteTask={(_id) => {
                setTaskToDelete(_id)
              }}
              onSelecteTasks={checkedTasks}
              isChecked={selectedTasks.has(task._id)}
              onTaskEdit={setEditableTask}
              number={index + 1}
              onChangeStatus={updateTask}
            />
          )
        })}
      </Row>
      
       
    

      <DeleteSelected
        disabled={!selectedTasks.size}
        taskCount={selectedTasks.size}
        onConfirmDelete={deleteSelectedTasks}
        tasks = {tasks}
        setSelectedTasks = {setSelectedTasks}
      />

      {taskToDelete && (
        <ConfirmDialog
          isOpen={taskToDelete}
          taskCount={1}
          confirmCancellation={() => {
            setTaskToDelete(null)
          }}
          onConfirmDelete={() => {
            deleteTask(taskToDelete)
            setTaskToDelete(null)
          }}
        />
      )}
      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </Container>
  )
}

export default memo(ToDo)
