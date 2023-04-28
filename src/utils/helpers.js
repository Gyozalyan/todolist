import moment from 'moment';

export const formatDate = (date) => {

    if (date instanceof Date) {
      return date.toISOString().slice(0, 10);
    }
    if (typeof date === "string") {
      return date.slice(0, 10);
    }

    if(!date){
      return ''
    }
    return moment(date).format('YYYY-MM-DD');
  };
  
