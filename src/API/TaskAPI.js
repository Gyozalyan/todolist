const taskApiUrl = process.env.REACT_APP_API_URL + "/task";

export default class TaskAPI {
  #request(method, data = {}) {
    const { body, id, filters } = data;

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
    if (id) {
      url = `${url}/${id}`;
    }

    if (filters) {
      let query = '?'
      Object.entries(filters).forEach(([key,value])=>{
        if(!value){
          return
        }
        query += `${key}=${value}&`;
      })
      url+=query
    }

   return fetch(url, fetchObj)
    .then((result) => result.json())
    .then((data)=>{
      if(data.error){
        throw data.error
      }
      return data
    })
  }

  getAllTasks(filters){
    return this.#request("GET", {filters: filters})
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