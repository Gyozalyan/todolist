// const formApiUrl = process.env.REACT_APP_API_URL + "/form";

export default class API {
#url = null;
  constructor (url){
    this.#url = url
  }


  request(method, data = {}) {
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

    let url = this.#url;
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

 
}