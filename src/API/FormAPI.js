import API from "./API";

const formApiUrl = process.env.REACT_APP_API_URL + "/form";

export default class FormAPI extends API{
 
  constructor(){
    super(formApiUrl);
  }


  sendForm(form){
    return this.request("POST",{body:form})  }

  
}