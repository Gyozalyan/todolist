const taskApiUrl = process.env.REACT_APP_API_URL + "/task";

export default class TaskAPI {
  #request(method, data = {}) {
    const { body, id } = data;

    const fetchObj = {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (body) {
      fetchObj.body = JSON.stringify(body);
    }

    let url = taskApiUrl;

    if(params){
      url = `${url}/${params}`;

    if (id) {
      url = `${url}/${id}`;
    }
  

   return fetch(url, fetchObj)
    .then((result) => result.json())
    .then((request)=>{
      if(request.error){
        throw request.error
      }
      return request
    })
  }

  getAllTasks(){
    return this.#request("GET")
  }

  addTask (newTask){
    return this.#request("POST", {body:newTask})
  }

  update(taskToUpdate){
    return this.#request("PUT", {body: taskToUpdate, id: taskToUpdate._id});  
  }

  deleteIdenticalTask(taskId){
    return this.#request("DELETE",{id:taskId})
  }

  deleteSelectedTasks (taskIdsArray){

    return this.#request("PATCH", {body:{tasks:taskIdsArray}})

  }

  searchTasks(){
    return this.#request("GET")
  }
}
}