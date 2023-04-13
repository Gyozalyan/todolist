
const taskApiUrl = process.env.REACT_APP_API_URL + "/task";


export default class TaskAPI {

  #request(method, body=null){
    const params = {
      
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
    };

    if(body!==null){
      params.body = JSON.stringify(body)
    }

    return fetch(taskApiUrl, params)
    .then((result) => result.json())
    .then((data)=>{
      if(data.error){
        throw data.error
      }
    return data
    })
  }

  get() {

    return this.#request("GET")
    
    
  }

  add(task) {

    return this.#request("POST", task)

  }

  put() {}

  delete() {}
}


