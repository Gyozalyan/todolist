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

    if (params) {
      return taskApiUrl + "/" + params;
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

  put() {}

  delete(taskID) {
    return this.#request("DELETE", { params: taskID });
  }

  deleteSelectedTasks(taskIDs){
    return this.#request("PATCH", {body: taskIDs});
  }
}
