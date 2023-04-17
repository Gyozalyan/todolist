export const formatDate = (date) => {

    if (date instanceof Date) {
      return date.toISOString().slice(0, 10);
    }
    if (typeof date === "string") {
      return date.slice(0, 10);
    }
    throw new Error("Date must be object or string");
  };
  
  export const curtailText = (text = '') =>{
    if (text.length > 50) {
      return text.slice(0, 50) + "...";
    }
    return text;
  }