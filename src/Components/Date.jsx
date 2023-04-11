import moment from "moment/moment";

export default function creationDate() {

  
   return moment().subtract(10, 'days').calendar();
  }



