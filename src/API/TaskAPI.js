const taskApiUrl = process.env.REACT_APP_API_URL + "/task";

export default class TaskAPI {
  #request(method, data = {}) {
    const { body, params } = data;
    const factors = {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (body) {
      factors.body = JSON.stringify(body);
    }

    let url = taskApiUrl;
    if(params){
      url = `${url}/${params}`;
    }
  

    return fetch(taskApiUrl, factors)
      .then((result) => result.json())
      .then((data) => {
        if (data.error) {
          throw data.error;
        }
        return data;
      });
  }

  get() {
    return this.#request("GET");
  }

  add(task) {
    return this.#request("POST", { body: task });
  }

  update(editedTask) {
    return this.#request("PUT", { body: editedTask, params: editedTask._id });
  }

  delete(taskID) {
    return this.#request("DELETE", { params: taskID });
  }

  deleteSelectedTasks(taskIDs) {
    return this.#request("PATCH", { body: { tasks: taskIDs } });
  }
}
