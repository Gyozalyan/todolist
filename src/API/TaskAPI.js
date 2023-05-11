import API from "./API";
const taskApiUrl = process.env.REACT_APP_API_URL + "/task";

export default class TaskAPI extends API {
  constructor() {
    super(taskApiUrl);
  }

  getSingle(taskId) {
    return this.request("GET", { id: taskId });
  }

  getAllTasks(filters) {
    return this.request("GET", { filters: filters });
  }

  addTask(newTask) {
    return this.request("POST", { body: newTask });
  }

  update(taskToUpdate) {
    return this.request("PUT", { body: taskToUpdate, id: taskToUpdate._id });
  }

  deleteIdenticalTask(taskId) {
    return this.request("DELETE", { id: taskId });
  }

  deleteSelectedTasks(taskIdsArray) {
    return this.request("PATCH", { body: { tasks: taskIdsArray } });
  }

  searchTasks() {
    return this.request("GET");
  }
}
